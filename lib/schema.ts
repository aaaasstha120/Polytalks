import { z } from "zod";

export const SignupSchema = z.object({
  fullname: z
    .string({ required_error: "Full name is required." })
    .min(3, { message: "Full name must be at least 3 characters." })
    .max(50, { message: "Full name cannot exceed 50 characters." }),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z
    .string({ required_error: "Password is required." })
    .describe("Your secure password")
    .min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string({
    required_error: "Confirm Password is required.",
  }),
});
//   .superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//       ctx.addIssue({
//         code: "custom",
//         message: "The passwords did not match",
//       });
//     }
//   });
