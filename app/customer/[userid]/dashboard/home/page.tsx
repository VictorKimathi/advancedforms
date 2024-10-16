import React from 'react'
import RootLayout from "@/app/customer/[userid]/dashboard/page";

import HeaderBox from '@/components/HeaderBox'
import Recommendation from '@/components/Recommendation';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import FinanceSummary from "@/components/FinanceSummary";
import DebtSummary from "@/components/DebtSummary";
import AIAnalysis from "@/components/AIAnalysis";

const Page = ({ searchParams: { id, page } }: SearchParamProps) => {
    const loggedIn = { firstName: "Victor", lastName: "Codes", email: "victorcodes9532@gmail.com" }
    const currentPage = Number(page as string) || 1;

    return (
        <RootLayout className="mb-4">
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <header className="flex items-center justify-between bg-white shadow-md px-5 py-3">
                    <h1 className="text-2xl font-bold text-gray-800">Home Page of Our AI App</h1>
                </header>
                <section className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                    <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll bg-white shadow-md rounded-lg">
                        <header className="flex flex-col justify-between gap-8">
                            <HeaderBox
                                type="greeting"
                                title="Welcome"
                                user={loggedIn?.firstName || 'Guest'}
                                subtext="Access and manage your account and transactions efficiently."
                            />
                            <TotalBalanceBox
                                accounts={[]}
                                totalBanks={1}
                                totalCurrentBalance={5000000.351}
                            />
                            <AIAnalysis transactionId={11}/>
                            {/*<Recommendation />*/}
                            {/*<FinanceSummary transactionId={11}/>*/}
{/*<DebtSummary />*/}


                        </header>
                    </div>

                    <RightSideBar
                        user={loggedIn}
                        transactions={[]}
                        banks={[{ currentBalance: 1250.33 }, { currentBalance: 1250.33 }]}
                    />
                </section>
            </div>
        </RootLayout>
    )
}

export default Page
