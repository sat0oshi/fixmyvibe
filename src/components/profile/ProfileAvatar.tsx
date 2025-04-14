
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User as UserIcon, X } from "lucide-react";

interface ProfileAvatarProps {
  userId: string;
  initialAvatarUrl: string | null;
  onAvatarChange: (url: string | null, file: File | null) => void;
}

const ProfileAvatar = ({ userId, initialAvatarUrl, onAvatarChange }: ProfileAvatarProps) => {
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "L'image doit faire moins de 2MB",
          variant: "destructive",
        });
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      onAvatarChange(objectUrl, file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    onAvatarChange(null, null);
  };

  return (
    <>
      <Avatar className="h-32 w-32">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Avatar" />
        ) : (
          <AvatarFallback className="text-4xl">
            <UserIcon className="h-16 w-16" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex gap-4">
        <label className="cursor-pointer">
          <Input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleAvatarChange} 
          />
          <Button type="button" variant="outline">
            Changer l'image
          </Button>
        </label>
        {avatarUrl && (
          <Button 
            type="button" 
            variant="outline"
            onClick={handleRemoveAvatar}
          >
            <X className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileAvatar;
