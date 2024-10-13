import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { z } from "zod";

/* eslint-disable no-prototype-builtins */

// Utility Functions
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
    return value.replace(/[^\w\s]/gi, "");
};

// URL and Query Handling
interface UrlQueryParams {
    params: string;
    key: string;
    value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
    const currentUrl = qs.parse(params);
    currentUrl[key] = value;

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
}

// Date and Time Formatting
export const formatDateTime = (dateString: Date | string, timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: timeZone,
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: timeZone,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        year: "numeric",
        day: "numeric",
        timeZone: timeZone,
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: timeZone,
    };

    return {
        dateTime: new Date(dateString).toLocaleString("en-US", dateTimeOptions),
        dateDay: new Date(dateString).toLocaleString("en-US", dateDayOptions),
        dateOnly: new Date(dateString).toLocaleString("en-US", dateOptions),
        timeOnly: new Date(dateString).toLocaleString("en-US", timeOptions),
    };
};

// Transaction Handling
export function countTransactionCategories(transactions: Transaction[]): CategoryCount[] {
    const categoryCounts: { [category: string]: number } = {};
    let totalCount = 0;

    transactions?.forEach((transaction) => {
        const category = transaction.category;

        if (categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
        } else {
            categoryCounts[category] = 1;
        }

        totalCount++;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
        totalCount,
    }));
}

export const getTransactionStatus = (date: Date) => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    return date > twoDaysAgo ? "Processing" : "Success";
};

// Currency Formatting
export function formatAmount(amount: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });

    return formatter.format(amount);
}

// Account Type Colors
export function getAccountTypeColors(type: AccountTypes) {
    switch (type) {
        case "depository":
            return {
                bg: "bg-blue-25",
                lightBg: "bg-blue-100",
                title: "text-blue-900",
                subText: "text-blue-700",
            };

        case "credit":
            return {
                bg: "bg-success-25",
                lightBg: "bg-success-100",
                title: "text-success-900",
                subText: "text-success-700",
            };

        default:
            return {
                bg: "bg-green-25",
                lightBg: "bg-green-100",
                title: "text-green-900",
                subText: "text-green-700",
            };
    }
}

// ID Encryption and Decryption
export function encryptId(id: string) {
    return btoa(id);
}

export function decryptId(id: string) {
    return atob(id);
}

// File Handling
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Extract Customer ID from URL
export function extractCustomerIdFromUrl(url: string) {
    const parts = url.split("/");
    return parts[parts.length - 1];
}

// Authentication Form Schema
export const authFormSchema = (type: string) => z.object({
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state: type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode: type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

// Encryption and Decryption for Passkey
export function encryptKey(passkey: string) {
    return btoa(passkey);
}

export function decryptKey(passkey: string) {
    return atob(passkey);
}
