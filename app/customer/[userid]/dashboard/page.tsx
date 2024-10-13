// app/layout.tsx or app/layout.js
import Sidebar from "@/components/SideBar";
import Image from "next/image";
import { ReactNode } from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <main className="flex h-screen w-full font-inter bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <div className="flex items-center p-4 bg-white shadow-md">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" className="mr-2" />
                </div>
                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>
            </div>
        </main>
    );
}
