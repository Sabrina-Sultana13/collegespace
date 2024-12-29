'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { UserType } from '@/lib/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import PersonalInfoFormFields from './personal-info-form-fields';
import { personalInfoFormSchema, PersonalInfoFormValues } from './schema';
import { useState } from 'react';

const PersonalInfoForm = ({ data }: { data: UserType }) => {
  const [isUploading, setIsUploading] = useState(false);

  const defaultValues: Partial<PersonalInfoFormValues> = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    dob: data?.studentDetails?.dob ?? '',
    gender: data?.studentDetails?.gender ?? '',
    country: data?.studentDetails?.country ?? '',
    about: data?.studentDetails?.about ?? '',
    experience: data?.studentDetails?.experience ?? '0',
  };

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  async function onSubmit(data: PersonalInfoFormValues) {
    const changedValues = form.formState.dirtyFields;

    if (!Object.keys(changedValues).length) {
      return;
    }

    setIsUploading(true);
    const formData = new FormData();

    try {
      if (data.cv instanceof File) {
        formData.append('cv', data.cv);
      }

      const changedValuesObj = Object.keys(changedValues).reduce(
        (result, key) => {
          if (key !== 'cv') {
            return {
              ...result,
              [key]:
                key === 'experience'
                  ? parseInt(
                      data[key as keyof PersonalInfoFormValues]?.toString() ??
                        '0',
                      10
                    )
                  : data[key as keyof PersonalInfoFormValues],
            };
          }
          return result;
        },
        {} as Partial<PersonalInfoFormValues>
      );

      if (data.country) {
        changedValuesObj.country = data.country;
      }

      formData.append('data', JSON.stringify(changedValuesObj));

      await toast.promise(
        fetch('/api/student-details', {
          method: 'PATCH',
          body: formData,
        }),
        {
          loading: 'Updating personal information...',
          success: 'Personal information updated!',
          error: 'Something went wrong',
        }
      );
    } catch (error) {
      console.error('Error updating:', error);
    } finally {
      setIsUploading(false);
    }
  }

  const isDisabled =
    Object.keys(form.formState.dirtyFields).length < 3 ||
    form.getValues('country') === '' ||
    form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 p-2'>
        <PersonalInfoFormFields
          form={form}
          currentCV={data?.studentDetails?.cv ?? undefined}
          isUploading={isUploading}
        />
        <Button type='submit' disabled={isDisabled || isUploading}>
          Update
        </Button>
      </form>
    </Form>
  );
};

PersonalInfoForm.displayName = 'ProfileForm';
export default PersonalInfoForm;
