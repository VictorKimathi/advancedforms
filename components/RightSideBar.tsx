import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] = countTransactionCategories(transactions);

    return (
        <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll bg-white shadow-lg">
            {/* Profile Section */}
            <section className="flex flex-col pb-8">
                <div className="h-[120px] w-full bg-gradient-to-r from-blue-500 to-green-500 bg-cover bg-no-repeat rounded-t-lg" />
                <div className="flex items-center mt-[-60px] mx-6 space-x-4">
                    <div className="flex items-center justify-center w-[60px] h-[60px] bg-gray-200 rounded-full">
                        <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className='text-lg font-semibold text-gray-800'>
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-gray-600">
                            {user.email}
                        </p>
                    </div>
                </div>
            </section>

            {/* Banks and Categories Section */}
            <section className="flex flex-col justify-between gap-8 px-6 py-8">
                {/* Banks Header */}
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">My Banks</h2>
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            alt="Add Bank"
                        />
                        <span className="text-sm font-semibold">
                            Add Bank
                        </span>
                    </Link>
                </div>

                {/* Bank Cards */}
                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className='relative z-10'>
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Categories Section */}
                <div className="mt-10 flex flex-1 flex-col gap-6">
                    <h2 className="text-lg font-semibold text-gray-900">Top categories</h2>

                    <div className='space-y-5'>
                        {categories.map((category, index) => (
                            <Category key={category.name} category={category} />
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    )
}

export default RightSideBar
