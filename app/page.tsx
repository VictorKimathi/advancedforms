import React from 'react'
import {Register} from "../components/forms/RegisterForm"
import Image from "next/image";
import RegisterForm from "@/components/forms/CustomerForm";
import CustomerForm from "@/components/forms/CustomerForm";


const user = {

}


const Page = () => {
    return (
        <div className="flex h-screen max-h-screen">
            <div className="remove-scrollbar container my-auto">
            {/*<Register />*/}
{/*<RegisterForm />*/}
                <CustomerForm user={user}/>
            </div>

            <Image
                src=""
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[50%]"
            />
        </div>
    )
}
export default Page
