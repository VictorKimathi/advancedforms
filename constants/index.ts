export const GenderOptions = ["Male", "Female", "Other"];
export const CategoryOptions = ["income","expense"]

export const sidebarLinks = [
    {
        imgURL: "/icons/home.svg",
        route: "/customer/123/dashboard/home",
        label: "Home",
    },

    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/transactions",
        label:"Enter Transactions"
    },
    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/dashboard/chat",
        label:"ChatBot"
    },
    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/dashboard/hub",
        label:"AI Hub"
    },
    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/debt-management",
        label:"Debt Management"
    },
    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/goal-management",
        label:"Goal Management "
    },
    {
        imgURL:"/icons/dollar-circle.svg",
        route:"/customer/123/profile",
        label:"User  Profile "
    },

];

export const IncomeSubCategoryOptions = [
    "Salary",
    "Freelance Work",
    "Investment Income",
    "Rental Income",
    "Business Income",
    "Interest Income",
    "Dividends",
    "Royalties",
    "Gifts and Grants",
    "Other Income"
];

export const ExpenseSubCategoryOptions = [
    "Rent",
    "Utilities",
    "Groceries",
    "Transportation",
    "Insurance",
    "Healthcare",
    "Entertainment",
    "Dining Out",
    "Clothing",
    "Miscellaneous"
];

export const accountProviders = [
    "Mpesa",
    "Airtel Money",
    "MTN Mobile Money",
    "Orange Money",
    "EcoCash",
    "PayPal",
    "Venmo",
    "Cash App",
    "Google Pay",
    "Apple Pay",
    "Samsung Pay",
    "Visa",

];


export const dummyAccount = [
    "Mpesa",
    "Airtel Money",
    "Paypal",
    "Equity Bank",
    "Binance Wallet",
]

export const CustomerFormDefaultValues = {
    username: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male", // Ensure this value matches one of your radio group options
    occupation: "",
    password:""
};


export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Resident Alien Card (Green Card)",
    "Social Security Card",
    "State ID Card",
    "Student ID Card",
    "Voter ID Card",
];

export const Doctors = [
    {
        image: "/assets/images/dr-green.png",
        name: "John Green",
    },
    {
        image: "/assets/images/dr-cameron.png",
        name: "Leila Cameron",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "David Livingston",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Evan Peter",
    },
    {
        image: "/assets/images/dr-powell.png",
        name: "Jane Powell",
    },
    {
        image: "/assets/images/dr-remirez.png",
        name: "Alex Ramirez",
    },
    {
        image: "/assets/images/dr-lee.png",
        name: "Jasmine Lee",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Alyana Cruz",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Hardik Sharma",
    },
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
};
