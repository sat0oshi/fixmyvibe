
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

// Exemples de projets, à remplacer par des données de Supabase
const mockProjects = [
  {
    id: "1",
    title: "Problème avec l'intégration API dans Bubble",
    description: "Je n'arrive pas à connecter mon application Bubble avec l'API externe que j'utilise. J'ai besoin d'aide pour comprendre comment configurer correctement les en-têtes et gérer l'authentification.",
    tags: ["Bubble", "API", "Intégration"],
    status: "pending",
    created_at: "2023-04-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Problème de mise en page Webflow",
    description: "Mon site Webflow ne s'affiche pas correctement sur mobile. Les éléments se chevauchent et certains contenus disparaissent. Comment puis-je résoudre ce problème de responsive design ?",
    tags: ["Webflow", "CSS", "Responsive"],
    status: "pending",
    created_at: "2023-04-02T14:30:00Z",
  },
  {
    id: "3",
    title: "Automatisation avec Zapier ne fonctionne pas",
    description: "J'ai configuré un zap pour envoyer des données de mon formulaire Typeform vers Airtable, mais les données n'arrivent pas. J'ai besoin d'aide pour déboguer mon workflow.",
    tags: ["Zapier", "Automation", "Typeform", "Airtable"],
    status: "assigned",
    created_at: "2023-04-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Problème avec les formules dans Airtable",
    description: "Je tente de créer une formule complexe dans Airtable qui calcule des dates en fonction de plusieurs conditions, mais je n'arrive pas à obtenir le résultat attendu.",
    tags: ["Airtable", "Formules", "Calcul"],
    status: "pending",
    created_at: "2023-04-04T16:45:00Z",
  },
  {
    id: "5",
    title: "Intégration de paiement Stripe avec Adalo",
    description: "Je n'arrive pas à configurer correctement l'intégration de Stripe dans mon application Adalo. Les paiements test fonctionnent mais en production j'ai des erreurs.",
    tags: ["Adalo", "Stripe", "Paiement"],
    status: "pending",
    created_at: "2023-04-05T11:20:00Z",
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredProjects(mockProjects);
    } else {
      const filtered = mockProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredProjects(filtered);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Projets en attente d'aide</h1>
              <p className="text-gray-600 max-w-2xl">
                Parcourez les projets soumis par des développeurs no-code qui ont besoin d'aide.
                Si vous avez l'expertise nécessaire, proposez votre aide!
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link to="/submit-project">
                <Button className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700">
                  Soumettre un projet
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Rechercher par titre, description ou tags..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6 card-hover">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                    <Badge
                      variant={project.status === "pending" ? "secondary" : "outline"}
                      className={project.status === "pending" ? "bg-amber-100 text-amber-700" : ""}
                    >
                      {project.status === "pending" ? "En attente" : "Assigné"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-fixmyvibe-50 text-fixmyvibe-700 border-fixmyvibe-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>Posté le {formatDate(project.created_at)}</span>
                    </div>
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="ghost" className="text-fixmyvibe-600 hover:text-fixmyvibe-700">
                        Voir détails <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
                <p className="text-gray-600">
                  Essayez de modifier vos termes de recherche ou explorez d'autres catégories.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
