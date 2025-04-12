
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { 
  Clock, Calendar, User, ArrowLeft, ExternalLink, MessageSquare, 
  Share2, Bookmark, BookmarkCheck
} from "lucide-react";

// Mock project, à remplacer par des données de Supabase
const mockProject = {
  id: "1",
  title: "Problème avec l'intégration API dans Bubble",
  description: "Je n'arrive pas à connecter mon application Bubble avec l'API externe que j'utilise. J'ai besoin d'aide pour comprendre comment configurer correctement les en-têtes et gérer l'authentification. J'ai déjà essayé plusieurs approches comme indiqué dans la documentation officielle, mais je continue à recevoir des erreurs d'authentification. Mon application est une plateforme de réservation qui nécessite une intégration avec un système de paiement tiers.",
  private_link: "https://bubble.io/page?name=index&id=myapp123",
  tags: ["Bubble", "API", "Intégration"],
  status: "pending",
  created_at: "2023-04-01T12:00:00Z",
  user: {
    id: "user1",
    username: "marie_nocode",
    avatar_url: null
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  
  // Pour le moment, nous utilisons des données fictives
  // À remplacer par la récupération du projet depuis Supabase
  const project = mockProject;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleOfferHelp = () => {
    // À implémenter avec Supabase
    console.log("Propose d'aider pour le projet:", id);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // À implémenter avec Supabase
  };

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
              {project.tags.map((tag, index) => (
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
                <span>Par {project.user.username}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold mb-3">Description du problème</h3>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>

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
                  <Button variant="ghost" size="sm" className="text-fixmyvibe-600">
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
              <Link to="/projects">
                <Button variant="outline">
                  Retour aux projets
                </Button>
              </Link>
              <Button 
                className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700"
                onClick={handleOfferHelp}
              >
                <MessageSquare size={18} className="mr-2" />
                Proposer mon aide
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
