
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  isScrolled: boolean;
  onClick?: () => void;
  className?: string;
};

const NavLink = ({ to, children, isScrolled, onClick, className = "" }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`transition-colors font-medium ${
        isScrolled
          ? 'text-fixmyvibe-600 hover:text-fixmyvibe-800 dark:text-fixmyvibe-400 dark:hover:text-fixmyvibe-300'
          : 'text-white/90 hover:text-white'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
