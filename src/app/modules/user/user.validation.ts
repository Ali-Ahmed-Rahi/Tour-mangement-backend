
import z from "zod";
import { IsActive } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.
    string({
      invalid_type_error: "Name must be String"
    })
      .min(2, { message: "Name Too Short. Minimum 2 character long" })
      .max(50, { message: "Name Too Long" }),

    email: z
    .string({invalid_type_error: "Email must be String"})
    .regex(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      { message: "Invalid email format" }
    ),

    password: z
    .string({invalid_type_error: "Password must be String"})
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
      }
    ),

    phone: z
    .string({invalid_type_error: "Phone Number must be String"})
    .regex(
      /^(?:\+88|88)?01[3-9]\d{8}$/,
      { message: "Invalid Bangladeshi phone number" }
    ).optional(),

    address: z
      .string({invalid_type_error: "Address must be String"})
      .min(5, { message: "Address too short" })
      .max(100, { message: "Address too long" })
      .optional(),
  })

export const updateUserZodSchema = z.object({
    name: z.
    string({
      invalid_type_error: "Name must be String"
    })
      .min(2, { message: "Name Too Short. Minimum 2 character long" })
      .max(50, { message: "Name Too Long" }).optional(),

    password: z
    .string({invalid_type_error: "Password must be String"})
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
      }
    ).optional(),

    phone: z
    .string({invalid_type_error: "Phone Number must be String"})
    .regex(
      /^(?:\+88|88)?01[3-9]\d{8}$/,
      { message: "Invalid Bangladeshi phone number" }
    ).optional(),

    role:z
    .enum(["ADMIN","GUIDE","USER","SUPER_ADMIN"])
    .optional(),
    IsActive:z
    .enum(Object.values(IsActive)as [string])
    .optional(),
    isDeleted:z
    .boolean({invalid_type_error:"isDeleted must be true or false"})
    .optional(),
    isVerified:z
    .boolean({invalid_type_error:"isVerified must be true or false"})
    .optional(),
    address: z
      .string({invalid_type_error: "Address must be String"})
      .max(100, { message: "Address too long" })
      .optional(),
  })