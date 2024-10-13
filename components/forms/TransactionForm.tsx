"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { dummyAccount } from "@/constants";
import { CategoryOptions, IncomeSubCategoryOptions, ExpenseSubCategoryOptions, CustomerFormDefaultValues } from "@/constants";
import { CustomerFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

const TransactionForm = () => {
    let activeCategory = IncomeSubCategoryOptions;
    const user = {
        name: "victor Kimathi",
        email: "victorcodes9532@gmail.com",
        phone: "0717382028"
    };
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("income");

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
        activeCategory = value === "income" ? IncomeSubCategoryOptions : ExpenseSubCategoryOptions;
        setSelectedCategory(value);
    };

    const onSubmit = async (values) => {
        setIsLoading(true);
        try {
            const customer = {
                userId: user.$id,
                ...values,
                birthDate: new Date(values.birthDate),
            };
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12 bg-white shadow-lg rounded-lg p-8">
                <section className="space-y-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Welcome 👋</h1>
                    <p className="text-gray-600">Enter your transactions.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="transactionName"
                    label="Enter the Transaction Name"
                    placeholder="I bought food"
                    className="border rounded-lg shadow-sm focus:ring focus:ring-blue-400"
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
                                    handleTransactionTypeChange(value);
                                }}
                                defaultValue={field.value}
                            >
                                {CategoryOptions.map((option, i) => (
                                    <div key={option + i} className="flex items-center">
                                        <RadioGroupItem value={option} id={option} className="mr-2" />
                                        <Label htmlFor={option} className="cursor-pointer text-gray-700">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="subcategory"
                    label="Select Subcategory"
                    renderSkeleton={() => (
                        <Select className="border rounded-lg shadow-sm focus:ring focus:ring-blue-400">
                            {activeCategory.map((option, index) => (
                                <SelectItem key={index} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />

                <h2 className="text-lg font-semibold text-gray-800">Select Your Account Providers</h2>
                {dummyAccount.map((provider) => (
                    <CustomFormField
                        key={provider}
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name={provider}
                        label={provider}
                        className="text-gray-700"
                    />
                ))}

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="transactionAmount"
                        label="Transaction or Expense Amount"
                        placeholder="500,000"
                        className="border rounded-lg shadow-sm focus:ring focus:ring-blue-400"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="transactionDescription"
                        label="Describe the transaction you just made"
                        placeholder="I sent money to Mama Mboga / I received my salary"
                        className="border rounded-lg shadow-sm focus:ring focus:ring-blue-400"
                    />
                </div>

                <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#1976d2' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Price (USD)</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        {/*<TableBody>*/}
                        {/*    {inventoryData.map((product, index) => (*/}
                        {/*        <TableRow*/}
                        {/*            key={index}*/}
                        {/*            sx={{*/}
                        {/*                '&:nth-of-type(odd)': { backgroundColor: '#f0f8ff' },*/}
                        {/*                '&:hover': { backgroundColor: '#e0f7fa' },*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <TableCell>{product.name}</TableCell>*/}
                        {/*            <TableCell align="right">${product.price}</TableCell>*/}
                        {/*            <TableCell align="right">{product.quantity}</TableCell>*/}
                        {/*        </TableRow>*/}
                        {/*    ))}*/}
                        {/*</TableBody>*/}
                    </Table>
                </TableContainer>

                <SubmitButton
                    isLoading={isLoading}
                    className="w-full mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Submit and Continue
                </SubmitButton>
            </form>
        </Form>
    );
};

export default TransactionForm;
