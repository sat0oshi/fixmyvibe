
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { User, Project, Connection } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, User as UserIcon, FileText, Link as LinkIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Récupérer les utilisateurs
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Récupérer les projets
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData.map(project => ({
        ...project,
        status: project.status as Project['status']
      })) || []);

      // Récupérer les connexions
      const { data: connectionsData, error: connectionsError } = await supabase
        .from("connections")
        .select(`
          *,
          projects (title),
          helper:profiles!connections_helper_id_fkey (username)
        `)
        .order("created_at", { ascending: false });

      if (connectionsError) throw connectionsError;
      setConnections(connectionsData || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Supprimer l'utilisateur de la base de données
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      // Mettre à jour la liste des utilisateurs
      setUsers(users.filter(user => user.id !== userId));

      toast({
        title: "Succès",
        description: "L'utilisateur a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      // Supprimer le projet de la base de données
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      // Mettre à jour la liste des projets
      setProjects(projects.filter(project => project.id !== projectId));

      toast({
        title: "Succès",
        description: "Le projet a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fixmyvibe-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Administrateur</h1>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Utilisateurs ({users.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Projets ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Connexions ({connections.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableCaption>Liste des utilisateurs enregistrés</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom d'utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'developer' 
                            ? 'bg-blue-100 text-blue-800' 
                            : user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role === 'developer' 
                            ? 'Développeur' 
                            : user.role === 'admin' 
                              ? 'Admin' 
                              : 'No-code'}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableCaption>Liste des projets</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : project.status === 'assigned' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {project.status === 'pending' 
                            ? 'En attente' 
                            : project.status === 'assigned' 
                              ? 'Assigné' 
                              : 'Terminé'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.tags && project.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(project.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableCaption>Liste des mises en relation</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projet</TableHead>
                    <TableHead>Développeur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date de création</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.map((connection) => (
                    <TableRow key={connection.id}>
                      <TableCell className="font-medium">{connection.projects?.title || "Projet inconnu"}</TableCell>
                      <TableCell>{connection.helper?.username || "Développeur inconnu"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          connection.status === 'active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {connection.status === 'active' ? 'Active' : 'Terminée'}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(connection.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
