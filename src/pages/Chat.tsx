import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, User } from "lucide-react";
import { Project, Message, Connection } from "@/types";

const Chat = () => {
  const { connectionId } = useParams<{ connectionId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [otherUser, setOtherUser] = useState<{ id: string; username: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch connection and project data
  useEffect(() => {
    const fetchData = async () => {
      if (!connectionId || !user) return;
      
      try {
        // Get connection details
        const { data: connectionData, error: connectionError } = await supabase
          .from("connections")
          .select("*")
          .eq("id", connectionId)
          .single();

        if (connectionError) throw connectionError;
        
        // Cast the status to ensure it matches our Connection type
        setConnection({
          ...connectionData,
          status: connectionData.status as Connection['status']
        });

        // Get project details
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .eq("id", connectionData.project_id)
          .single();

        if (projectError) throw projectError;
        
        // Cast the status to ensure it matches our Project type
        setProject({
          ...projectData,
          status: projectData.status as Project['status']
        });

        // Determine the other user
        const isProjectOwner = user.id === projectData.user_id;
        const otherId = isProjectOwner ? connectionData.helper_id : projectData.user_id;
        
        // Get other user details
        const { data: otherUserData, error: otherUserError } = await supabase
          .from("profiles")
          .select("id, username")
          .eq("id", otherId)
          .single();

        if (otherUserError) throw otherUserError;
        setOtherUser(otherUserData);

        // Load messages
        await loadMessages();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de conversation.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [connectionId, user, toast]);

  // Load messages
  const loadMessages = async () => {
    if (!connectionId) return;
    
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("connection_id", connectionId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      
      // Scroll to bottom after messages load
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  // Set up realtime subscription for messages
  useEffect(() => {
    if (!connectionId) return;
    
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `connection_id=eq.${connectionId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (newMessage.user_id !== user?.id) {
            // Play a notification sound for messages from the other user
            const audio = new Audio('/notification.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Show toast notification
            toast({
              title: "Nouveau message",
              description: `${otherUser?.username || 'L\'autre utilisateur'} vous a envoyé un message.`,
            });
          }
          setMessages(prev => [...prev, newMessage]);
          
          // Scroll to bottom on new message
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [connectionId, user, otherUser, toast]);

  // Send a message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connectionId || !user || !newMessage.trim()) return;
    
    setIsSending(true);
    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          connection_id: connectionId,
          user_id: user.id,
          content: newMessage.trim()
        });

      if (error) throw error;
      
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Format date for messages
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fixmyvibe-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project || !connection || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Conversation introuvable</h3>
              <p className="text-gray-600 mb-4">
                Cette conversation n'existe pas ou vous n'avez pas les droits pour y accéder.
              </p>
              <Link to="/">
                <Button>Retour à l'accueil</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = user.id === project.user_id;
  const userRole = isOwner ? "no-code" : "developer";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link to={isOwner ? "/" : "/helper-dashboard"} className="text-fixmyvibe-600 hover:text-fixmyvibe-700 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Retour au {isOwner ? "tableau de bord" : "tableau de bord développeur"}
            </Link>
          </div>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Badge variant="outline" className="bg-fixmyvibe-50 text-fixmyvibe-700 border-fixmyvibe-200 w-fit">
                  {isOwner ? "Votre projet" : "Projet accepté"}
                </Badge>
              </div>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="flex flex-col h-[500px]">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-fixmyvibe-600" />
                  <CardTitle className="text-md">
                    Conversation avec {otherUser?.username || "l'autre utilisateur"}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucun message. Commencez la conversation !</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isCurrentUser = message.user_id === user.id;
                    
                    return (
                      <div 
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            isCurrentUser 
                              ? 'bg-fixmyvibe-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="text-sm break-words">{message.content}</div>
                          <div 
                            className={`text-xs mt-1 ${
                              isCurrentUser ? 'text-fixmyvibe-100' : 'text-gray-500'
                            }`}
                          >
                            {formatMessageTime(message.created_at)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              <div className="p-4 border-t">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-grow"
                    disabled={isSending}
                  />
                  <Button 
                    type="submit" 
                    className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                    disabled={!newMessage.trim() || isSending}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
