import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PersonalInfoFormValues } from './schema';
import SelectDateField from '@/components/shared/select-date-field';
import SelectCountryField from '@/components/shared/select-country-field';
import SelectGenderField from '@/components/shared/select-gender-field';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";

const fields = [
  {
    value: 'name',
    description: 'To change your name, please contact support.',
  },
  {
    value: 'email',
    description: 'Your email address is the primary way we contact you.',
  },
  {
    value: 'phone',
    description:
      'Your phone number is not publicly visible. But it is visible to recruiters.',
  },
];

const PersonalInfoFormFields = ({
  form,
  currentCV,
  isUploading,
}: {
  form: UseFormReturn<PersonalInfoFormValues>;
  currentCV?: string;
  isUploading?: boolean;
}) => {
  return (
    <>
      {fields.map((item) => (
        <FormField
          control={form.control}
          name={item.value as keyof PersonalInfoFormValues}
          key={item.value}
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel className='capitalize'>{field.name}</FormLabel>
              <FormControl>
                <Input maxLength={51} {...(field as any)} disabled />
              </FormControl>
              <FormDescription>{item.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <FormField
        control={form.control}
        name='about'
        render={({ field }) => (
          <FormItem className='col-span-full'>
            <FormLabel className='capitalize'>{field.name}</FormLabel>
            <FormControl>
              <Textarea rows={4} maxLength={1000} {...field} />
            </FormControl>
            <FormDescription>
              Describe your professional experience, accomplishments, and
              skills.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='experience'
        render={({ field }) => (
          <FormItem className='col-span-full'>
            <FormLabel className='capitalize'>{field.name}</FormLabel>
            <FormControl>
              <Input type='number' min={0} max={10} {...field} />
            </FormControl>
            <FormDescription>
              How many years of experience do you have in your field?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <SelectCountryField form={form} />
      <SelectDateField
        form={form}
        name='dob'
        label='Date of birth'
        description='This won’t be part of your public profile.'
      />
      <SelectGenderField form={form} />
      <FormField
        control={form.control}
        name="cv"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem className="col-span-full">
            <FormLabel>CV Upload</FormLabel>
            <div className="space-y-2">
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    disabled={isUploading}
                    {...field}
                    value={undefined}
                  />
                  {isUploading && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </FormControl>
              {currentCV && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(currentCV, '_blank')}
                    disabled={isUploading}
                  >
                    View Current CV
                  </Button>
                </div>
              )}
            </div>
            <FormDescription>
              Upload your CV in PDF format (max 5MB)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

PersonalInfoFormFields.displayName = 'PersonalInfoFormFields';
export default PersonalInfoFormFields;
