import { Button } from "@/components/ui/button";
import Link from 'next/link';
import ModeToggle from "./mode-toggle";
import { ShoppingCart, UserIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";



const Menu = () => {
    return (<div className="flex justify-end gap-3">
        <nav className="hidden md:flex w-full max-w-xs gap-1">
            <ModeToggle />
            <Button asChild variant="ghost">
                <Link href="/cart" >
                    <ShoppingCart /> Cart
                </Link>
            </Button>

            <Button asChild>
                <Link href="/sign-in" >
                    <UserIcon /> Sign In
                </Link>
            </Button>
        </nav>
        <MenuSheet/>
    </div>);
}

export default Menu;