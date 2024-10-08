export const GenderOptions = ["Male", "Female", "Other"];
export const CategoryOptions = ["income","expense"]


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
    "MasterCard",
    "Chase",
    "Bank of America",
    "Wells Fargo",
    "HSBC",
    "Barclays",
    "CitiBank",
    "Deutsche Bank",
    "MetaMask",
    "Coinbase Wallet",
    "Trust Wallet",
    "Binance Wallet",
];


export const dummyAccount = [
    "Mpesa",
    "Airtel Money",
    "Paypal",
    "Equity Bank",
    "Binance Wallet",
]



export const CustomerFormDefaultValues = {
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    accountProviders: [],
    savingAmount: "",
    debt: "",
    income: "",
    description: "",
    subscriptionInformation: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    financialAdviceConsent: false,
    dataSharingConsent: false,
    privacyPolicyConsent: false,
    automatedDecisionConsent: false,
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
