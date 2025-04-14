
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Récupération des projets depuis Supabase
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, profiles:user_id(username)')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as (Project & { profiles: { username: string } })[];
    }
  });

  // Filtrage des projets en fonction du terme de recherche
  const filteredProjects = projects ? projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  ) : [];

  // Pagination
  const totalPages = Math.ceil((filteredProjects?.length || 0) / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors d'une nouvelle recherche
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-fixmyvibe-600 animate-spin" />
              <span className="ml-3 text-lg">Chargement des projets...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-red-600 mb-2">Erreur de chargement</h3>
              <p className="text-gray-600">
                Une erreur est survenue lors du chargement des projets. Veuillez réessayer.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentProjects.length > 0 ? (
                currentProjects.map((project) => (
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
                      {project.tags && project.tags.map((tag, index) => (
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

              {filteredProjects.length > projectsPerPage && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
