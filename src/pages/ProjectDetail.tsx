import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; 
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types";
import { 
  Clock, Calendar, User, ArrowLeft, ExternalLink, MessageSquare, 
  Share2, Bookmark, BookmarkCheck, HelpingHand
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [projectOwner, setProjectOwner] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [connection, setConnection] = useState<{ id: string } | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        // Cast the status to ensure it matches our Project type
        setProject({
          ...data,
          status: data.status as Project['status']
        });

        // Fetch project owner details
        const { data: ownerData, error: ownerError } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", data.user_id)
          .single();

        if (ownerError) throw ownerError;
        setProjectOwner(ownerData);

        // Check if current user is the helper
        if (user && data.helper_id === user.id) {
          // Look for existing connection
          const { data: connectionData, error: connectionError } = await supabase
            .from("connections")
            .select("id")
            .eq("project_id", id)
            .eq("helper_id", user.id)
            .single();

          if (!connectionError && connectionData) {
            setConnection(connectionData);
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du projet.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, user, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const acceptProject = async () => {
    if (!user || !project || profile?.role !== "developer") {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté en tant que développeur pour accepter ce projet.",
        variant: "destructive",
      });
      return;
    }

    setIsAccepting(true);
    try {
      // Update the project status and set the helper_id
      const { error: updateError } = await supabase
        .from("projects")
        .update({
          status: "assigned",
          helper_id: user.id,
        })
        .eq("id", project.id);

      if (updateError) throw updateError;

      // Create a connection between the helper and the project
      const { data: connectionData, error: connectionError } = await supabase
        .from("connections")
        .insert({
          project_id: project.id,
          helper_id: user.id,
        })
        .select()
        .single();

      if (connectionError) throw connectionError;

      setConnection(connectionData);
      
      // Update local project state
      setProject({
        ...project,
        status: "assigned" as Project['status'],
        helper_id: user.id
      });

      toast({
        title: "Projet accepté",
        description: "Vous avez accepté ce projet. Vous pouvez maintenant discuter avec le créateur.",
      });
    } catch (error) {
      console.error("Error accepting project:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'accepter ce projet.",
        variant: "destructive",
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const startChat = () => {
    if (connection) {
      navigate(`/chat/${connection.id}`);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // À implémenter avec Supabase
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

  if (!project || !projectOwner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Projet introuvable</h3>
              <p className="text-gray-600 mb-4">
                Ce projet n'existe pas ou vous n'avez pas les droits pour y accéder.
              </p>
              <Link to="/projects">
                <Button>Voir tous les projets</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isHelper = user && project.helper_id === user.id;
  const isOwner = user && project.user_id === user.id;
  const canSeePrivateLink = isHelper || isOwner;
  const canAcceptProject = user && profile?.role === "developer" && project.status === "pending";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/projects" className="text-fixmyvibe-600 hover:text-fixmyvibe-700 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Retour aux projets
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">{project.title}</h1>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={toggleSave}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck size={16} className="text-fixmyvibe-600" />
                      Sauvegardé
                    </>
                  ) : (
                    <>
                      <Bookmark size={16} />
                      Sauvegarder
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Share2 size={16} />
                  Partager
                </Button>
                <Badge
                  variant={project.status === "pending" ? "secondary" : "outline"}
                  className={project.status === "pending" ? "bg-amber-100 text-amber-700" : ""}
                >
                  {project.status === "pending" ? "En attente" : "Assigné"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags && project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-fixmyvibe-50 text-fixmyvibe-700 border-fixmyvibe-200">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Posté le {formatDate(project.created_at)}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>Par {projectOwner.username}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold mb-3">Description du problème</h3>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>

            {canSeePrivateLink && project.private_link && (
              <Card className="bg-fixmyvibe-50 border-fixmyvibe-200 mb-8">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <ExternalLink size={18} className="mr-2 text-fixmyvibe-600" />
                    Lien privé du projet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Ce lien n'est visible que par les développeurs qui proposent leur aide.
                  </p>
                  <div className="bg-white p-3 rounded border border-fixmyvibe-200 flex justify-between items-center">
                    <span className="text-gray-800 truncate">{project.private_link}</span>
                    <a 
                      href={project.private_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="text-fixmyvibe-600">
                        Voir
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
              <Link to="/projects">
                <Button variant="outline">
                  Retour aux projets
                </Button>
              </Link>
              
              {canAcceptProject && (
                <Button 
                  className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                  onClick={acceptProject}
                  disabled={isAccepting}
                >
                  <HelpingHand size={18} className="mr-2" />
                  {isAccepting ? "En cours..." : "Accepter ce projet"}
                </Button>
              )}
              
              {connection && (
                <Button 
                  className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                  onClick={startChat}
                >
                  <MessageSquare size={18} className="mr-2" />
                  Discuter avec {isHelper ? projectOwner.username : "le développeur"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
