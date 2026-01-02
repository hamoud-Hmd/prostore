import { EllipsisVertical, ShoppingCart } from "lucide-react";
import { SheetTrigger, Sheet, SheetContent, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import UserButton from "./user-button";


const MenuSheet = () => {
    return (
        <nav className="md:hidden">
            <Sheet>

                <SheetTrigger className="align-middle" >
                    <EllipsisVertical />
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start">
                    <SheetTitle>Menu</SheetTitle>
                    <ModeToggle />
                    <Button asChild variant="ghost" className="w-full mt-2">
                        <Link href="/cart" >
                            <ShoppingCart /> Cart
                        </Link>
                    </Button>
               <UserButton />
                    <SheetDescription></SheetDescription>
                </SheetContent>

            </Sheet>
        </nav>
    );
}

export default MenuSheet;