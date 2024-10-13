import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});



export const CustomerFormValidation = z.object({
    username: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"]),
password: z.string().min(8),
    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(500, "Occupation must be at most 500 characters"),

});





// export const CustomerFormDefaultValues = {
//     username: "",
//     email: "",
//     phone: "",
//     birthDate: new Date(Date.now()),
//     gender: "Male", // Ensure this value matches one of your radio group options
//     occupation: "",
// };

