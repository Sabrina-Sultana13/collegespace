import * as z from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const personalInfoFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dob: z.date().or(z.string()),
  gender: z.string(),
  country: z.string().min(1, 'Please select a country'),
  about: z.string().max(1000),
  experience: z.number().min(0).max(10).or(z.string()),
  cv: z
    .any()
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      'Max file size is 5MB.'
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only PDF files are accepted.'
    )
    .optional(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
