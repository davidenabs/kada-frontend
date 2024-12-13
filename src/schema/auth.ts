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

// *password schema
const passwordSchema = z
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
  });

// *base register schema
const baseRegisterSchema = {
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(11, { message: "Phone number must be 11 characters" }),
  password: passwordSchema,
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
  acceptTerms: z.boolean().refine((data) => data === true, {
    message: "You must accept the terms and conditions",
  }),
  userType: z.string().min(1, { message: "User type is required" }),
};

// *register schema
export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    ...baseRegisterSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// *cooperative schema
export const CooperativeSchema = z
  .object({
    cooperativeName: z
      .string()
      .min(1, { message: "Cooperative name is required" }),
    lga: z
      .string()
      .min(1, { message: "LGA is required" }),
    ...baseRegisterSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CooperativeSchemaType = z.infer<typeof CooperativeSchema>;

// *vendor schema
export const VendorSchema = z
  .object({
    vendorName: z.string().min(1, { message: "Vendor name is required" }),
    ...baseRegisterSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type VendorSchemaType = z.infer<typeof VendorSchema>;

// *cooperative schema
export const EnumeratorSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" }),
    // lga: z
    //   .string()
    //   .min(1, { message: "LGA is required" }),
    ...baseRegisterSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type EnumeratorSchemaType = z.infer<typeof EnumeratorSchema>;

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

// *enumerator register farmer schema
export const EnumeratorRegisterFarmerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    nin: z.string().min(1, { message: "NIN is required" }),
    ...baseRegisterSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type EnumeratorRegisterFarmerSchemaType = z.infer<typeof EnumeratorRegisterFarmerSchema>;
