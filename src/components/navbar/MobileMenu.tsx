
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle, FilePlus, HelpingHand, ShieldAlert } from "lucide-react";
import { User } from "@/types";

type MobileMenuProps = {
  user: any;
  profile: User | null;
  isAdmin: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleSignOut: () => void;
};

const MobileMenu = ({ user, profile, isAdmin, setIsMenuOpen, handleSignOut }: MobileMenuProps) => {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 w-full py-4 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col gap-4">
        <NavLink
          to="/projects"
          isScrolled={true}
          onClick={() => setIsMenuOpen(false)}
          className="py-2 border-b"
        >
          Projets
        </NavLink>
        
        {profile?.role === "developer" && (
          <NavLink
            to="/helper-dashboard"
            isScrolled={true}
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b"
          >
            Tableau de bord Dev
          </NavLink>
        )}
        
        {isAdmin && (
          <Link
            to="/admin-dashboard"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-fixmyvibe-600 dark:hover:text-fixmyvibe-400 transition-colors py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShieldAlert className="h-5 w-5" />
            Administration
          </Link>
        )}
        
        <NavLink
          to="/about"
          isScrolled={true}
          onClick={() => setIsMenuOpen(false)}
          className="py-2 border-b"
        >
          À propos
        </NavLink>
        
        {user && profile?.role === "no-code" && (
          <Link
            to="/submit-project"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-fixmyvibe-600 dark:hover:text-fixmyvibe-400 transition-colors py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            <FilePlus className="h-5 w-5" />
            Soumettre un projet
          </Link>
        )}
        
        {user && profile?.role === "developer" && (
          <Link
            to="/helper-dashboard"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-fixmyvibe-600 dark:hover:text-fixmyvibe-400 transition-colors py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            <HelpingHand className="h-5 w-5" />
            Aider des projets
          </Link>
        )}
        
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-fixmyvibe-600 dark:hover:text-fixmyvibe-400 transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircle className="h-5 w-5" />
              Mon profil
            </Link>
            <Button 
              variant="outline" 
              className="w-full text-fixmyvibe-600 dark:text-fixmyvibe-400 border-fixmyvibe-600 dark:border-fixmyvibe-400 hover:bg-fixmyvibe-50 dark:hover:bg-fixmyvibe-950/20"
              onClick={handleSignOut}
            >
              Déconnexion
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <NavButton 
              to="/auth" 
              variant="outline" 
              isScrolled={true}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </NavButton>
            <NavButton 
              to="/auth" 
              variant="default" 
              isScrolled={true}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Inscription
            </NavButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
