
import { Loader2 } from "lucide-react";

const LoadingProfile = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingProfile;
