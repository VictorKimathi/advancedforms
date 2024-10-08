"use client";
import {

    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Form } from "@/components/ui/form";


import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {FC, useState} from "react";
import {Control, useForm} from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {FormFieldType} from "@/components/forms/page";


interface CustomProps{
    control:Control <any>,
    fieldType:FormFieldType,
    name:string,
    label:string,
    placeholder:string,
    iconSrc:string,
    iconAlt:string,

}

export const CustomFormField = ({control,name, fieldType}:CustomProps)=>{
    const form = useForm();
    const router = useRouter();

    return (

        <FormField
            control={form.control}
            name="username"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />




    )
}