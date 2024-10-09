"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { accountProviders } from "@/constants";
import { GenderOptions, CustomerFormDefaultValues } from "@/constants";
import { CustomerFormValidation } from "@/lib/vallidation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof CustomerFormValidation>>({
        resolver: zodResolver(CustomerFormValidation),
        defaultValues: {
            ...CustomerFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    const onSubmit = async (values: z.infer<typeof CustomerFormValidation>) => {
        setIsLoading(true);

        // Store file info in form data if applicable
        let formData;
        if (
            values.identificationDocument &&
            values.identificationDocument?.length > 0
        ) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.identificationDocument[0].name);
        }

        try {
            const customer = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                accountProviders: values.accountProviders,
                savingAmount: values.savingAmount,
                debt: values.debt,
                income: values.income,
                description: values.description,
                subscriptionInformation: values.subscriptionInformation,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                financialAdviceConsent: values.financialAdviceConsent,
                dataSharingConsent: values.dataSharingConsent,
                privacyPolicyConsent: values.privacyPolicyConsent,
                automatedDecisionConsent: values.automatedDecisionConsent,
            };

            const newCustomer = await registerCustomer(customer);

            if (newCustomer) {
                router.push(`/customers/${user.$id}/dashboard`);
            }
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-12"
            >
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
                        name="name"
                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
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
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="(555) 123-4567"
                        />
                    </div>

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
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option, i) => (
                                            <div key={option + i} className="radio-group">
                                                <RadioGroupItem value={option} id={option}/>
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

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="14 street, New York, NY - 5101"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder="Software Engineer"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="Guardian's name"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency contact number"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Financial Information</h2>
                    </div>

                    <h2>Select Your Account Providers</h2>
                    {accountProviders.map((provider) => (
                        <CustomFormField
                            key={provider}
                            fieldType={FormFieldType.CHECKBOX}
                            control={form.control}
                            name={provider}
                            label={provider}
                        />
                    ))}

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="savingAmount"
                            label="Saving Amount (if any)"
                            placeholder="500 000"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="debt"
                            label="Enter Debt Balance (if any)"
                            placeholder="100 000"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="income"
                            label="Enter any income (if any)"
                            placeholder="100 000"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="description"
                            label="Describe yourself and your expectations with this platform"
                            placeholder="I want to have better insights from my money"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="subscriptionInformation"
                            label="Have you enrolled in any subscriptions? If yes, tell us about it"
                            placeholder="YouTube Premium"
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="financialAdviceConsent"
                        label="I consent to receive financial advice and recommendations based on my provided information."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="dataSharingConsent"
                        label="I consent to the sharing of my financial information with authorized third parties for the purpose of delivering personalized advice."
                    />
                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="privacyPolicyConsent"
                        label="I acknowledge that I have reviewed and agree to the privacy policy and terms of service."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="automatedDecisionConsent"
                        label="I consent to the use of automated decision-making for generating financial insights and recommendations."
                    />
                </section>

                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
