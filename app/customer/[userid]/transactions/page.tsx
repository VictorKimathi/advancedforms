"use client";

import Image from "next/image";
import CustomerForm from "@/components/forms/CustomerForm";
import TransactionForm from "@/components/forms/TransactionForm";
import RootLayout from "@/app/customer/[userid]/dashboard/page";

const Register = ({ params: { userId } }) => {
    const user = { userId };

    return (
        <RootLayout>
            <div className="flex h-screen max-h-screen overflow-hidden">
                <section className="remove-scrollbar container flex flex-col justify-center items-center py-10 bg-gray-50 shadow-lg">
                    <div className="sub-container max-w-[860px] flex-1 flex flex-col items-center py-10 bg-white rounded-lg shadow-lg">
                        <Image
                            src="/assets/icons/logo-full.svg"
                            height={1000}
                            width={1000}
                            alt="FinacAI Logo"
                            className="mb-12 h-10 w-fit"
                        />

                        <TransactionForm user={user} />

                        <p className="copyright py-12 text-gray-500 text-sm">© 2024 FinacAI</p>
                    </div>
                </section>

                <Image
                    src="/assets/images/register-img.png"
                    height={1000}
                    width={1000}
                    alt="Registration Illustration"
                    className="side-img max-w-[390px] hidden md:block object-cover"
                />
            </div>
        </RootLayout>
    );
};

export default Register;
