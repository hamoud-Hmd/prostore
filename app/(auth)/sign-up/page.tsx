import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import SignUpForm from "./sign-up-form";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Sign up for your ProStore account to access exclusive features and manage your orders with ease.',
}

const SignUpPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string;
    }>
}) => {
    const { callbackUrl } = await props.searchParams;
    const session = await auth();
    if (session) {
        redirect(callbackUrl || '/');
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center">
                        <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} width={100} height={100} priority={true} />
                    </Link>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                    <CardDescription className="text-center">Create a new account</CardDescription>
                    <CardContent className="space-y-6">
                        <SignUpForm />
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default SignUpPage;