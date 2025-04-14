
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

type NavButtonProps = {
  to?: string;
  variant?: "default" | "outline" | "ghost";
  isScrolled: boolean;
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
};

const NavButton = ({
  to,
  variant = "outline",
  isScrolled,
  children,
  icon: Icon,
  onClick,
  className = "",
}: NavButtonProps) => {
  const buttonContent = (
    <Button
      variant={variant}
      className={`${
        variant === "outline" && !isScrolled
          ? "text-white border-white hover:bg-white/10"
          : variant === "outline"
          ? "border-fixmyvibe-600 text-fixmyvibe-600 hover:bg-fixmyvibe-50 dark:border-fixmyvibe-400 dark:text-fixmyvibe-400 dark:hover:bg-fixmyvibe-950/20"
          : variant === "ghost" && !isScrolled
          ? "text-white hover:bg-white/10"
          : variant === "ghost"
          ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          : isScrolled
          ? "bg-fixmyvibe-600 hover:bg-fixmyvibe-700 text-white dark:bg-fixmyvibe-400 dark:hover:bg-fixmyvibe-500"
          : "bg-white text-fixmyvibe-600 hover:bg-gray-100"
      } ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default NavButton;
