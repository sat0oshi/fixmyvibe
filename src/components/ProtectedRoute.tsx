
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "no-code" | "developer";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fixmyvibe-600"></div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "Accès refusé",
      description: "Vous devez être connecté pour accéder à cette page.",
      variant: "destructive",
    });
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    toast({
      title: "Accès refusé",
      description: `Cette page est réservée aux utilisateurs avec le rôle "${requiredRole}".`,
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
