
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "no-code" | "developer";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [redirectPath, setRedirectPath] = useState<string>("/auth");
  const [showContent, setShowContent] = useState<boolean>(false);

  // Use useEffect for all side effects like showing toast and determining redirects
  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      return;
    }

    if (!user) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      setShouldRedirect(true);
      setRedirectPath("/auth");
      return;
    }

    if (requiredRole && profile?.role !== requiredRole) {
      toast({
        title: "Accès refusé",
        description: `Cette page est réservée aux utilisateurs avec le rôle "${requiredRole}".`,
        variant: "destructive",
      });
      setShouldRedirect(true);
      setRedirectPath("/");
      return;
    }

    // User is authenticated and has the right role
    setShowContent(true);
    setShouldRedirect(false);
  }, [user, profile, isLoading, requiredRole, toast]);

  // Loading state is handled without early return
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fixmyvibe-600"></div>
      </div>
    );
  }

  // Redirect if needed (after all hooks have been called)
  if (shouldRedirect) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Render children (after all hooks have been called)
  return showContent ? <>{children}</> : null;
};

export default ProtectedRoute;
