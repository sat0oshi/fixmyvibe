
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserCircle, Menu, X, FilePlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-bold text-2xl transition-colors ${scrolled ? 'text-fixmyvibe-600' : 'text-white'}`}>
            FixMyVibe
          </span>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/projects" 
            className={`transition-colors ${
              scrolled ? 'text-gray-700 hover:text-fixmyvibe-600' : 'text-white/90 hover:text-white'
            }`}
          >
            Projets
          </Link>
          <Link 
            to="/developers" 
            className={`transition-colors ${
              scrolled ? 'text-gray-700 hover:text-fixmyvibe-600' : 'text-white/90 hover:text-white'
            }`}
          >
            Développeurs
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${
              scrolled ? 'text-gray-700 hover:text-fixmyvibe-600' : 'text-white/90 hover:text-white'
            }`}
          >
            À propos
          </Link>
        </div>

        {/* Boutons d'authentification desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {profile?.role === "no-code" && (
                <Link to="/submit-project">
                  <Button
                    variant={scrolled ? "outline" : "outline"}
                    className={!scrolled ? "text-white border-white hover:bg-white/10" : "border-fixmyvibe-600 text-fixmyvibe-600 hover:bg-fixmyvibe-50"}
                  >
                    <FilePlus className="mr-2 h-4 w-4" />
                    Soumettre un projet
                  </Button>
                </Link>
              )}
              <span className={`transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                {profile?.username || user.email}
              </span>
              <Link to="/dashboard">
                <Button variant="ghost" className="rounded-full" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </Link>
              <Button 
                variant={scrolled ? "outline" : "outline"} 
                className={!scrolled ? "text-white border-white hover:bg-white/10" : ""}
                onClick={handleSignOut}
              >
                Déconnexion
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button 
                  variant={scrolled ? "ghost" : "outline"} 
                  className={!scrolled ? "text-white border-white hover:bg-white/10" : ""}
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/auth">
                <Button className={scrolled ? "bg-fixmyvibe-600 hover:bg-fixmyvibe-700" : "bg-white text-fixmyvibe-600 hover:bg-gray-100"}>
                  Inscription
                </Button>
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
            className={!scrolled ? "text-white" : ""}
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
            {user && profile?.role === "no-code" && (
              <Link
                to="/submit-project"
                className="flex items-center gap-2 text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                <FilePlus className="h-5 w-5" />
                Soumettre un projet
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-fixmyvibe-600 transition-colors py-2 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="h-5 w-5" />
                  Mon profil
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSignOut}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
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
