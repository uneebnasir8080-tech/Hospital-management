import { z } from "zod";


export const zScehma= z.object({
    email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be less than 50 characters")
})

export const medicineSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  type: z.string().min(1, "Type is required"),
  price: z.preprocess((val) => parseFloat(val), z.number().positive("Price must be positive")),
  stock: z.preprocess((val) => parseInt(val, 10), z.number().int().nonnegative("Stock cannot be negative")),
  expiry: z.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Invalid date",
  }),
  manufacturer: z.string().min(2, "Manufacturer is required"),
});