'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { singInWithCredentials } from "@/lib/actions/user.actions";

const SignInForm = () => {
    const [data, action] = useActionState(singInWithCredentials, {success: false, message: ''});

    const SingInButton = () => {
    
        const { pending } = useFormStatus();
        return (
            <Button className="w-full" variant="default" disabled={pending}>
                {pending ? 'Signing In...' : 'Sign In'}
            </Button>
        );
    }

    return (
        <form action={action}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        autoComplete="email"
                        defaultValue={signInDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        name="password"
                        type="password" 
                        placeholder="Your password" 
                        required 
                        autoComplete="current-password"
                        defaultValue={signInDefaultValues.password}
                    />
                </div>

                <SingInButton />
                {data && !data.success && (
                    <div className="text-sm text-center text-red-600">
                        {data.message}
                    </div>
                ) }
                <div className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" target='_self' className="link">
                        Sign Up
                    </Link>
                </div>

            </div>
        </form>
    );
}

export default SignInForm;