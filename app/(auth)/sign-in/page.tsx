import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your ProStore account to access exclusive features and manage your orders with ease.',
}


const SingInPage = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center">
                        <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} width={100} height={100} priority={true} />
                    </Link>
                    <CardTitle className="text-center">Sign In</CardTitle>
                    <CardDescription className="text-center">Sign in to your account</CardDescription>
                    <CardContent className="space-y-6">
                        {/* Sign-in form will go here */}
                        
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default SingInPage;