
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DesktopNavigation from "./DesktopNavigation";
import DesktopUserActions from "./DesktopUserActions";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const isAdmin = profile?.role === 'admin' || user?.email === 'kncsprod@gmail.com';

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-fixmyvibe-600 dark:text-fixmyvibe-400">
            FixMyVibe
          </span>
        </Link>

        <DesktopNavigation 
          profile={profile} 
          isAdmin={isAdmin} 
          isScrolled={true} 
        />

        <DesktopUserActions 
          user={user} 
          profile={profile} 
          isAdmin={isAdmin} 
          isScrolled={true} 
          handleSignOut={handleSignOut} 
        />

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 dark:text-gray-200"
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
