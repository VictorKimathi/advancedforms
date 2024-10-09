import React from 'react'
import RootLayout from "@/app/customer/[userid]/dashboard/page";
const Page = () => {
    return (
        <RootLayout>
            <div>
                <h1>Welcome to the Home Page</h1>
                <p>This is some content that will be displayed within the RootLayout.</p>
            </div>
        </RootLayout>
    )
}
export default Page
