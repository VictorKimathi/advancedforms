"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../SubmitButton";

import "react-phone-number-input/style.css";

const user = {
    "username": "victor123",
    "email": "victor.codes9532@gmail.com",
    "password": "securePassword123",
    "profile": {
      "phone_number": "0712345678",
      "gender": "male",  // Valid value from GENDER_CHOICES
      "occupation": "software_dev",  // Valid value from OCCUPATION_CHOICES
      "date_of_birth": "1995-05-15"
    }
  }


export const Register = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            // Create user object
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            // Log the user information
            console.log("User Information:", user);

            // Send POST request to API endpoint
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            // Handle successful registration (e.g., redirect)
            const data = await response.json();
            console.log("Registration successful:", data);

            // Redirect to another page after successful registration
            router.push(`/customer/${123}/Register`);
        } catch (error) {
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Hi there, tell us more about yourself.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="username"
                    label="Username"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="(555) 123-4567"
                />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
};
