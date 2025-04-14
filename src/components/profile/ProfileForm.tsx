
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ProfileAvatar from "./ProfileAvatar";
import ProfileSkills from "./ProfileSkills";
import { ProfileFormValues } from "./types";

const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }),
  name: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email({ message: "Email invalide" }).optional(),
  skills: z.array(z.string()).optional(),
});

interface ProfileFormProps {
  userId: string;
  initialProfile: {
    username: string;
    name?: string;
    bio?: string;
    email?: string;
    skills?: string[];
    avatar_url?: string | null;
  };
}

const ProfileForm = ({ userId, initialProfile }: ProfileFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialProfile.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [availableSkills] = useState([
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue", "Angular", 
    "Node.js", "Python", "PHP", "Ruby", "Java", "C#", "Swift", "Kotlin",
    "SQL", "MongoDB", "Firebase", "AWS", "WordPress", "Shopify", "Webflow"
  ]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: initialProfile.username || "",
      name: initialProfile.name || "",
      bio: initialProfile.bio || "",
      email: initialProfile.email || "",
      skills: initialProfile.skills || [],
    },
  });

  const handleAvatarChange = (url: string | null, file: File | null) => {
    setAvatarUrl(url);
    setAvatarFile(file);
  };

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarFile) return avatarUrl;
    
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile);
      
    if (uploadError) {
      toast({
        title: "Erreur de téléchargement",
        description: uploadError.message,
        variant: "destructive",
      });
      return null;
    }
    
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      let avatarURL = avatarUrl;
      if (avatarFile) {
        avatarURL = await uploadAvatar(userId);
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: values.username,
          name: values.name,
          bio: values.bio,
          email: values.email,
          skills: values.skills,
          avatar_url: avatarURL,
        })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
          <CardDescription>Choisissez une image qui vous représente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <ProfileAvatar
            userId={userId}
            initialAvatarUrl={avatarUrl}
            onAvatarChange={handleAvatarChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Modifiez vos informations de profil</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biographie</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        value={field.value || ""} 
                        placeholder="Parlez-nous de vous..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <ProfileSkills
                control={form.control}
                availableSkills={availableSkills}
              />
              
              <CardFooter className="px-0 pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
