"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { LogInFormValidation } from "@/lib/validation"; // Ensure you create a validation schema for login
import SubmitButton from "@/components/SubmitButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof LogInFormValidation>>({
        resolver: zodResolver(LogInFormValidation),
        defaultValues: {
            email: "", // Make sure these match your validation schema
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LogInFormValidation>) => {
        setIsLoading(true);

        try {
            // Create user object
            const user = {
                email: values.email,
                password: values.password,
            };

            // Log the user information
            console.log("User Information:", user);

            // Send POST request to API endpoint
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            // Handle successful login (e.g., redirect)
            const data = await response.json();
            console.log("Login successful:", data);

            // Redirect to another page after successful login
            router.push(`/dashboard`); // Adjust the redirect as needed
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
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
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Password"
                />

                <SubmitButton isLoading={isLoading}>Log In</SubmitButton>
            </form>
        </Form>
    );
};

export default Login;
