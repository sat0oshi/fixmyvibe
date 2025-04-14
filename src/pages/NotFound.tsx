import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-20 pb-20">
        <div className="text-center px-4">
          <h1 className="text-8xl font-bold text-fixmyvibe-600 mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-6">Oups ! Cette page n'existe pas</p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            La page que vous recherchez a peut-être été déplacée, supprimée ou n'a jamais existé.
          </p>
          <Link to="/">
            <Button className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
