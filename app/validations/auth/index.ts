import * as z from "zod";
export const EMAIL_REGEX =
  /^[a-zA-Z0-9](?!.*[-_.]{2})[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const registrationSchema = z
  .object({
    // fullName: z
    //   .string({ message: "Full Name is required" })
    //   .min(3, { message: "" }),
    email: z
      .string({
        message: "Email is required",
      })
      .email({ message: "Please enter a valid email" })
      .regex(EMAIL_REGEX, {
        message: "Invalid email format. No special characters at start/end.",
      })

      .transform((val) => val.toLowerCase()),
    password: z.string({ message: "Full Name is required" }).regex(PWD_REGEX, {
      message: `At least 8 characters (and up to 24 characters) \n
Must include uppercase and lowercase letters \n
Must include at least one special character, e.g.,- % $ ! @ # ?`,
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export const loginSchema = z.object({
    email: z
      .string({
        message: "Email is required",
      })
      .email({ message: "Please enter a valid email" })
      .regex(EMAIL_REGEX, {
        message: "Invalid email format. No special characters at start/end.",
      }),
    password: z.string(),
    rememberMe: z.enum(["on"]).optional()
})
export type RegistrationSchema = z.infer<typeof registrationSchema> 
export type LoginSchema = z.infer<typeof loginSchema> 