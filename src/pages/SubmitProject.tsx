
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FilePenLine, Eye, EyeOff, ArrowRight, Link as LinkIcon } from "lucide-react";

const SubmitProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateLink, setPrivateLink] = useState("");
  const [showPrivateLink, setShowPrivateLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour soumettre un projet.",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            user_id: user.id,
            title: title.trim(),
            description: description.trim(),
            private_link: privateLink.trim() || null,
            tags: [] // On pourra ajouter le support des tags plus tard
          }
        ])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Projet soumis avec succès",
        description: "Votre projet a été soumis et est en attente d'aide.",
        variant: "default"
      });
      
      // Rediriger vers la page du projet créé
      if (data && data[0]) {
        navigate(`/projects/${data[0].id}`);
      } else {
        navigate('/projects');
      }
    } catch (error: any) {
      console.error("Erreur lors de la soumission du projet:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la soumission du projet.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Soumettre un Projet</h1>
            <p className="text-gray-600">
              Décrivez votre problème no-code et un développeur vous aidera gratuitement.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePenLine className="h-5 w-5 text-fixmyvibe-600" />
                Détails du Projet
              </CardTitle>
              <CardDescription>
                Fournissez des détails précis pour recevoir l'aide la plus adaptée.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-medium">
                    Titre du projet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Problème avec l'intégration API dans Bubble"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez votre problème en détail. Indiquez les outils que vous utilisez, les étapes que vous avez essayées, etc."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="privateLink" className="font-medium flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                      Lien privé (optionnel)
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPrivateLink(!showPrivateLink)}
                      className="h-8 px-2 text-gray-500"
                    >
                      {showPrivateLink ? (
                        <EyeOff className="h-4 w-4 mr-1" />
                      ) : (
                        <Eye className="h-4 w-4 mr-1" />
                      )}
                      {showPrivateLink ? "Masquer" : "Afficher"}
                    </Button>
                  </div>
                  <Input
                    id="privateLink"
                    value={privateLink}
                    onChange={(e) => setPrivateLink(e.target.value)}
                    type={showPrivateLink ? "text" : "password"}
                    placeholder="Ex: https://monapp.bubble.io/"
                  />
                  <p className="text-sm text-gray-500">
                    Ce lien ne sera visible que par les développeurs qui ont accepté de vous aider.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Soumission en cours..." : "Soumettre le projet"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitProject;
