
import NavButton from "@/components/navbar/NavButton";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle, FilePlus, HelpingHand, ShieldAlert } from "lucide-react";

type DesktopUserActionsProps = {
  user: any;
  profile: User | null;
  isAdmin: boolean;
  isScrolled: boolean;
  handleSignOut: () => void;
};

const DesktopUserActions = ({ 
  user, 
  profile, 
  isAdmin, 
  isScrolled, 
  handleSignOut 
}: DesktopUserActionsProps) => {
  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <NavButton to="/auth" variant="ghost" isScrolled={isScrolled}>
          Connexion
        </NavButton>
        <NavButton to="/auth" variant="default" isScrolled={isScrolled}>
          Inscription
        </NavButton>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-4">
      {profile?.role === "no-code" && (
        <NavButton 
          to="/submit-project" 
          variant="outline" 
          isScrolled={isScrolled}
          icon={FilePlus}
        >
          Soumettre un projet
        </NavButton>
      )}
      
      {profile?.role === "developer" && (
        <NavButton 
          to="/helper-dashboard" 
          variant="outline" 
          isScrolled={isScrolled}
          icon={HelpingHand}
        >
          Aider des projets
        </NavButton>
      )}
      
      {isAdmin && (
        <NavButton 
          to="/admin-dashboard" 
          variant="outline" 
          isScrolled={isScrolled}
          icon={ShieldAlert}
        >
          Administration
        </NavButton>
      )}
      
      <Link to="/profile">
        <Button 
          variant="ghost" 
          className={`rounded-full ${
            isScrolled 
              ? 'text-fixmyvibe-600 dark:text-fixmyvibe-400 hover:bg-fixmyvibe-50 dark:hover:bg-gray-800' 
              : 'text-white hover:bg-white/10'
          }`} 
          size="icon"
        >
          <UserCircle className="h-6 w-6" />
        </Button>
      </Link>
      
      <NavButton 
        variant="outline" 
        isScrolled={isScrolled}
        onClick={handleSignOut}
      >
        Déconnexion
      </NavButton>
    </div>
  );
};

export default DesktopUserActions;
