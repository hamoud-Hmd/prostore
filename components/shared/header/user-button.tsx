import Link from "next/link";
import { UserIcon } from "lucide-react";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const UserButton = async () => {

    const session = await auth();

    if (!session) {
        return (<Button asChild className="w-full">
            <Link href="/sign-in" >
                <UserIcon /> Sign In
            </Link>
        </Button>)
    }
    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

    return (
        <div className="flex gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                        <Button variant='ghost'
                            className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            {firstInitial}
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <div className="text-sm font-medium leading-none">
                                {session.user?.name}
                            </div>
                            <div className="text-sm font-muted-foreground leading-none">
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="p-0 mb-1">
                        <form action={signOutUser} className="w-full">
                            <Button type="submit" variant="ghost" className="w-full rounded-none">
                                Sign Out
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default UserButton;