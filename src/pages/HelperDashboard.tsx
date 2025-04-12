import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types";
import { HelpingHand, MessageSquare, ExternalLink } from "lucide-react";

const HelperDashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [pendingProjects, setPendingProjects] = useState<Project[]>([]);
  const [acceptedProjects, setAcceptedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch pending projects
        const { data: pendingData, error: pendingError } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "pending")
          .order("created_at", { ascending: false });

        if (pendingError) throw pendingError;
        // Cast the status to ensure it matches our Project type
        setPendingProjects((pendingData || []).map(project => ({
          ...project,
          status: project.status as Project['status']
        })));

        // Fetch projects accepted by the current helper
        if (user) {
          const { data: acceptedData, error: acceptedError } = await supabase
            .from("projects")
            .select("*")
            .eq("status", "assigned")
            .eq("helper_id", user.id)
            .order("updated_at", { ascending: false });

          if (acceptedError) throw acceptedError;
          // Cast the status to ensure it matches our Project type
          setAcceptedProjects((acceptedData || []).map(project => ({
            ...project,
            status: project.status as Project['status']
          })));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user, toast]);

  const acceptProject = async (projectId: string) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour accepter un projet.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update the project status and set the helper_id
      const { error: updateError } = await supabase
        .from("projects")
        .update({
          status: "assigned",
          helper_id: user.id,
        })
        .eq("id", projectId);

      if (updateError) throw updateError;

      // Create a connection between the helper and the project
      const { error: connectionError } = await supabase
        .from("connections")
        .insert({
          project_id: projectId,
          helper_id: user.id,
        });

      if (connectionError) throw connectionError;

      toast({
        title: "Projet accepté",
        description: "Vous avez accepté ce projet et pouvez maintenant discuter avec le créateur.",
      });

      // Refresh the projects lists
      setPendingProjects(pendingProjects.filter(p => p.id !== projectId));
      
      // Get the updated project and add it to accepted projects
      const { data: updatedProject } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
        
      if (updatedProject) {
        // Cast the status to ensure it matches our Project type
        setAcceptedProjects([{
          ...updatedProject,
          status: updatedProject.status as Project['status']
        }, ...acceptedProjects]);
      }
    } catch (error) {
      console.error("Error accepting project:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'accepter ce projet.",
        variant: "destructive",
      });
    }
  };

  const startChat = async (projectId: string) => {
    try {
      // Get the connection ID for this project and helper
      const { data: connection, error } = await supabase
        .from("connections")
        .select("id")
        .eq("project_id", projectId)
        .eq("helper_id", user?.id)
        .single();

      if (error) throw error;

      if (connection) {
        navigate(`/chat/${connection.id}`);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir la conversation.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (profile?.role !== 'developer') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Accès réservé</h3>
              <p className="text-gray-600">
                Cette page est réservée aux développeurs. Si vous êtes développeur, veuillez mettre à jour votre profil.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord développeur</h1>
          
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpingHand className="h-5 w-5 text-fixmyvibe-600" />
                  Projets en attente d'aide
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fixmyvibe-600"></div>
                  </div>
                ) : pendingProjects.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titre</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell className="max-w-md">
                              <div className="line-clamp-2">{project.description}</div>
                            </TableCell>
                            <TableCell>{formatDate(project.created_at)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                className="text-fixmyvibe-600 border-fixmyvibe-200"
                                onClick={() => acceptProject(project.id)}
                              >
                                Accepter ce projet
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Aucun projet en attente pour le moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-fixmyvibe-600" />
                  Mes projets acceptés
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fixmyvibe-600"></div>
                  </div>
                ) : acceptedProjects.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titre</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Lien privé</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {acceptedProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell className="max-w-md">
                              <div className="line-clamp-2">{project.description}</div>
                            </TableCell>
                            <TableCell>
                              {project.private_link ? (
                                <a 
                                  href={project.private_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-fixmyvibe-600 hover:underline"
                                >
                                  <ExternalLink size={14} />
                                  Voir le lien
                                </a>
                              ) : (
                                <Badge variant="outline">Aucun lien</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button 
                                className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                                onClick={() => startChat(project.id)}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Discuter
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Vous n'avez pas encore accepté de projet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelperDashboard;
