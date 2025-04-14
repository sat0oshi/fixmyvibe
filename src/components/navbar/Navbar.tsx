
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DesktopNavigation from "./DesktopNavigation";
import DesktopUserActions from "./DesktopUserActions";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();

  const isAdmin = profile?.role === 'admin' || user?.email === 'kncsprod@gmail.com';

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
        scrolled 
          ? "bg-white dark:bg-gray-900 shadow-md py-2" 
          : "bg-transparent dark:bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span 
            className={`font-bold text-2xl transition-colors ${
              scrolled 
                ? 'text-fixmyvibe-600 dark:text-fixmyvibe-400' 
                : 'text-white dark:text-white'
            }`}
          >
            FixMyVibe
          </span>
        </Link>

        <DesktopNavigation 
          profile={profile} 
          isAdmin={isAdmin} 
          isScrolled={scrolled} 
        />

        <DesktopUserActions 
          user={user} 
          profile={profile} 
          isAdmin={isAdmin} 
          isScrolled={scrolled} 
          handleSignOut={handleSignOut} 
        />

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className={`${
              !scrolled 
                ? "text-white" 
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu 
          user={user} 
          profile={profile} 
          isAdmin={isAdmin} 
          setIsMenuOpen={setIsMenuOpen}
          handleSignOut={handleSignOut}
        />
      )}
    </nav>
  );
};

export default Navbar;
