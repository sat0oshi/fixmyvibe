
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
      className={`transition-colors ${
        isScrolled
          ? 'text-gray-700 hover:text-fixmyvibe-600 dark:text-gray-200 dark:hover:text-fixmyvibe-400'
          : 'text-white/90 hover:text-white'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
