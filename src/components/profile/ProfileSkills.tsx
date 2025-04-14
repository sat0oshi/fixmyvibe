
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { ProfileFormValues } from "./types";

interface ProfileSkillsProps {
  control: Control<ProfileFormValues>;
  availableSkills: string[];
}

const ProfileSkills = ({ control, availableSkills }: ProfileSkillsProps) => {
  return (
    <div>
      <FormLabel>Compétences</FormLabel>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableSkills.map(skill => (
          <FormField
            key={skill}
            control={control}
            name="skills"
            render={({ field }) => (
              <FormItem
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(skill)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      if (checked) {
                        field.onChange([...current, skill]);
                      } else {
                        field.onChange(
                          current.filter((value) => value !== skill)
                        );
                      }
                    }}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">
                  {skill}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;
