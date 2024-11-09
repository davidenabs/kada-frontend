import { OtpType } from "@/interface/auth";
import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email or phone number is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default LoginSchema;

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one capital letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one small letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    acceptTerms: z.boolean().refine((data) => data === true, {
      message: "You must accept the terms and conditions",
    }),
    userType: z.string().min(1, { message: "User type is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// forgot password schema
export const ForgotPasswordSchema = z.object({
  userId: z.string().min(1, { message: "Email or phone number is required" }),
  type: z
    .string()
    .min(1, { message: "Type is required" })
    .refine(
      (data) => {
        return data === OtpType.CHANGE_PASSWORD;
      },
      { message: "Invalid type" }
    ),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

// reset password schema
export const ResetPasswordSchema = z
  .object({
    userId: z.string().min(1, { message: "Email or phone number is required" }),
    otp: z.string().min(1, { message: "OTP is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one capital letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one small letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
