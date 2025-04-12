
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TODO: Remplacer par l'authentification réelle une fois Supabase connecté
  // const user = null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-fixmyvibe-600 font-bold text-2xl">FixMyVibe</span>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/projects" className="text-gray-700 hover:text-fixmyvibe-600 transition-colors">
            Projets
          </Link>
          <Link to="/developers" className="text-gray-700 hover:text-fixmyvibe-600 transition-colors">
            Développeurs
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-fixmyvibe-600 transition-colors">
            À propos
          </Link>
        </div>

        {/* Boutons d'authentification desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="ghost" className="rounded-full" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700">Inscription</Button>
              </Link>
            </>
          )}
        </div>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              to="/projects"
              className="text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Projets
            </Link>
            <Link
              to="/developers"
              className="text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Développeurs
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle className="h-5 w-5" />
                Mon profil
              </Link>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-fixmyvibe-600 hover:bg-fixmyvibe-700">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
