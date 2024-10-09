// app/layout.tsx or app/layout.js
import Sidebar from "@/components/SideBar";
import Image from "next/image";
import { ReactNode } from "react";

// @ts-ignore
export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar />

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                </div>
                {children}
            </div>
        </main>
    );
}
