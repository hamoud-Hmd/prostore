'use client';
import {useState, useEffect} from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";
const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                {theme === 'system' ? <SunMoon /> : theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>   
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                checked={theme === 'light'}
                onCheckedChange={() => setTheme('light')}
            >
                Light
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={theme === 'dark'}
                onCheckedChange={() => setTheme('dark')}
            >
                Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={theme === 'system'}
                onCheckedChange={() => setTheme('system')}
            >
                System
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>);
}

export default ModeToggle;