import { Button } from "@/components/ui/button";
import Link from 'next/link';
import ModeToggle from "./mode-toggle";
import { ShoppingCart } from "lucide-react";
import MenuSheet from "./menu-sheet";
import UserButton from "./user-button";



const Menu = () => {
    return (<div className="flex justify-end gap-3 items-center">
        <nav className="hidden md:flex w-full max-w-xs gap-1 items-center justify-center">
            <ModeToggle />
            <Button asChild variant="ghost">
                <Link href="/cart" >
                    <ShoppingCart /> Cart
                </Link>
            </Button>

            <UserButton />
        </nav>
        <MenuSheet/>
    </div>);
}

export default Menu;