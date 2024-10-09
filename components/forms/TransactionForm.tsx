"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select"; // Import the Select component
import { SelectItem } from "@/components/ui/select";
import { dummyAccount } from "@/constants";
import { CategoryOptions, IncomeSubCategoryOptions, ExpenseSubCategoryOptions, CustomerFormDefaultValues } from "@/constants";
import { CustomerFormValidation } from "@/lib/vallidation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

const TransactionForm = () => {


    var activeCategory = IncomeSubCategoryOptions;
    const user = {
        name:"victor Kimathi",
        email:"victorcodes9532@gmail.com",
        phone:"0717382028"
    }
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(""); // State to track the selected category
    const [transactionType, setTransactionType] = useState('income'); // Default to income
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [description, setDescription] = useState('');


    const form = useForm<z.infer<typeof CustomerFormValidation>>({
        resolver: zodResolver(CustomerFormValidation),
        defaultValues: {
            ...CustomerFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },

    });
    const handleTransactionTypeChange = (value) => {
        // setTransactionType(value);
        // console.log(transactionType)
        //TODO(remember to add authentication)
        console.log("Before",activeCategory.toLocaleString())

        if (value == "income"){
            activeCategory.splice(0,activeCategory.length);
            activeCategory.push(IncomeSubCategoryOptions);

        }
        else
        {


            activeCategory.push(ExpenseSubCategoryOptions);
        }

    };

    console.log("After",activeCategory.toLocaleString())

    const onSubmit = async (values: z.infer<typeof CustomerFormValidation>) => {
        setIsLoading(true);

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
                identificationDocument: values.identificationDocument ? formData : undefined,
                financialAdviceConsent: values.financialAdviceConsent,
                dataSharingConsent: values.dataSharingConsent,
                privacyPolicyConsent: values.privacyPolicyConsent,
                automatedDecisionConsent: values.automatedDecisionConsent,
            };

            console.log("Hello");
            console.log(customer);
            if (customer) {
                router.replace(`/customer/${123}/success`);
            }
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Enter your transactions.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="transactionName"
                    label="Enter the transaction Name"
                    placeholder="I bought Food"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="category"
                    label="Income/Expense"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup
                                className="flex h-11 gap-6 xl:justify-between"
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedCategory(value); // Update the selected category
                                    handleTransactionTypeChange(value)
                                }}


                                defaultValue={field.value}
                            >
                                {CategoryOptions.map((option, i) => (
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

                {/* Render Select based on selected category */}
                {selectedCategory && (
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="subcategory" // Ensure the name matches your form schema
                        label="Select Subcategory"
                        renderSkeleton={() => (
                            <Select >
                                {(activeCategory).map((option, index) => (
                                    <SelectItem  key={index} value={option}>
                                      {option}
                                    </SelectItem >
                                ))}




                            </Select>
                        )}
                    />
                )}


                <h2>Select Your Account Providers</h2>
                {dummyAccount.map((provider) => (
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
                        name="transactionAmount" // Corrected name for consistency
                        label="Transaction Or Expense Amount"
                        placeholder="500 000"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="transactionDescription"
                        label="Describe the transaction you just made"
                        placeholder="I sent money from mama Mboga / I received my salary"
                    />
                </div>

                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    );
};

export default TransactionForm;
