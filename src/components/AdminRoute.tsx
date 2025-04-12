
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  // Use useEffect for side effects like showing toast and determining redirects
  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Vérifier si l'utilisateur est connecté et a le rôle admin ou l'email spécifique
    const isAdmin = profile?.role === 'admin' || user?.email === 'kncsprod@gmail.com';

    if (!user || !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur.",
        variant: "destructive",
      });
      setShouldRedirect(true);
      return;
    }

    setIsAuthorized(true);
  }, [user, profile, isLoading, toast]);

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
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render children (after all hooks have been called)
  return isAuthorized ? <>{children}</> : null;
};

export default AdminRoute;
