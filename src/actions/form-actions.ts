/**
 * Generic Form Server Actions
 *
 * Reusable server actions for form handling
 */

// 'use server';
//
// Example with validation:
// import { z } from 'zod';
//
// const contactSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   message: z.string().min(10, 'Message must be at least 10 characters'),
// });
//
// export async function submitContactForm(formData: FormData) {
//   const rawData = {
//     name: formData.get('name'),
//     email: formData.get('email'),
//     message: formData.get('message'),
//   };
//
//   const validated = contactSchema.safeParse(rawData);
//
//   if (!validated.success) {
//     return {
//       success: false,
//       errors: validated.error.flatten().fieldErrors
//     };
//   }
//
//   // Process the form
//   return { success: true };
// }
