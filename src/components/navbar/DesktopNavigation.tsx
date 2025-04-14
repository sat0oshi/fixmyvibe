
import NavLink from "./NavLink";
import { User } from "@/types";

type DesktopNavigationProps = {
  profile: User | null;
  isAdmin: boolean;
  isScrolled: boolean;
};

const DesktopNavigation = ({ profile, isAdmin, isScrolled }: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex items-center gap-8">
      <NavLink to="/projects" isScrolled={isScrolled}>
        Projets
      </NavLink>
      
      {profile?.role === "developer" && (
        <NavLink to="/helper-dashboard" isScrolled={isScrolled}>
          Tableau de bord Dev
        </NavLink>
      )}
      
      {isAdmin && (
        <NavLink to="/admin-dashboard" isScrolled={isScrolled}>
          Administration
        </NavLink>
      )}
      
      <NavLink to="/about" isScrolled={isScrolled}>
        À propos
      </NavLink>
    </div>
  );
};

export default DesktopNavigation;
