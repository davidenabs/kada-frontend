import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
  // .min(6, { message: "Password must be at least 6 characters" })
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one capital letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one small letter",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" })
  // .regex(/[^a-zA-Z0-9]/, {
  //   message: "Password must contain at least one special character",
  // }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default LoginSchema;
