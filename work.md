"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import Button from "@/components/ui/Button";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { accountProviders } from "@/constants";
import { GenderOptions, CustomerFormDefaultValues } from "@/constants";
import { CustomerFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import {Button} from "@/components/ui/button";

const RegisterForm = ({ user }: { user: User }) => {
const router = useRouter();
const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof CustomerFormValidation>>({
        resolver: zodResolver(CustomerFormValidation),
        defaultValues: CustomerFormDefaultValues
    });

    const onSubmit = async (values: z.infer<typeof CustomerFormValidation>) => {
        console.log("On submit is called");
        // try {
        //     setIsLoading(true);
        //
        //     const customer = {
        //         username: values.username,
        //         email: values.email,
        //         password: values.password,
        //         profile: {
        //             phone_number: values.phone,
        //             gender: values.gender,
        //             occupation: values.occupation,
        //             date_of_birth: values.birthDate?.toISOString().split("T")[0] || null,
        //         },
        //     };
        //
        //     const response = await fetch('http://127.0.0.1:8000/api/register/', {
        //         method: 'POST',
        //         body: JSON.stringify(customer),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //
        //     const responseText = await response.text(); // Read as text first
        //     console.log('Raw response:', responseText); // Log the raw response
        //
        //     // Check if the response is JSON
        //     let data;
        //     try {
        //         data = JSON.parse(responseText); // Try to parse as JSON
        //     } catch (parseError) {
        //         console.error('Failed to parse response as JSON:', responseText);
        //         throw new Error('Failed to parse response as JSON.');
        //     }
        //
        //     if (!response.ok) {
        //         console.error('Registration failed:', data);
        //         throw new Error(data.message || 'Registration failed');
        //     }
        //
        //     // Handle successful registration
        //     router.replace(`/customer/${data.userId}/success`);
        // } catch (error) {
        //     console.error("Error during registration:", error);
        // } finally {
        //     setIsLoading(false);
        // }



        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                body: JSON.stringify({
                    username: "victor",
                    email: "victcodes9532@gmail.com",
                    password: "secuePassword123",
                    profile: {
                        phone_number: "0723456781",
                        gender: "male",
                        occupation: "software_dev",
                        date_of_birth: "1995-05-15"
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message); // Expect "User registered successfully."
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Failed to parse response as JSON:', error);
        }

    };



    // @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Complete your personal profile.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="username"
                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email address"
                        placeholder="johndoe@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="password"
                        iconSrc="/assets/icons/lock.svg"
                        iconAlt="lock"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of birth"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        value={field.value || "Male"} // Use a default value if field.value is undefined
                                    >
                                        {GenderOptions.map((option, i) => (
                                            <div key={option + i} className="radio-group">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />

                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software Engineer"
                    />
                </section>
                {/*<Button*/}
                {/*    type="submit">SUbmit</Button>*/}
                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
