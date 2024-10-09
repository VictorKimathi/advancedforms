import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";

const ProfileCompletionSuccess = async ({
                                            params: { userId },
                                        }: {
    params: { userId: string };
}) => {
    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-10 w-fit"
                    />
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">profile information</span> has been successfully submitted!
                    </h2>
                    <p>You're now ready to access your personalized financial dashboard.</p>
                </section>

                <section className="profile-details">
                    <p>Profile completion details: </p>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/assets/images/user-avatar.svg"
                            alt="user avatar"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap">Welcome, [User's Name]!</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt="calendar"
                        />
                        <p> Profile updated on {formatDateTime(new Date()).dateTime}</p>
                    </div>
                </section>

                <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link href={`/users/${userId}/dashboard`}>
                        Go to Dashboard
                    </Link>
                </Button>

                <p className="copyright">© 2024 FinancAI</p>
            </div>
        </div>
    );
};

export default ProfileCompletionSuccess;
