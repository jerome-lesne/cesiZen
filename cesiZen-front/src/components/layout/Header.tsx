import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Header() {
    const [open, setOpen] = useState(false); // 👈 control the sheet

    return (
        <header className="w-full h-16 bg-gray-800 text-white flex items-center px-4 shadow justify-between md:justify-start">
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-gray-900 text-white" aria-describedby={undefined}>
                        <SheetHeader>
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                        </SheetHeader>
                        <Sidebar isMobile onLinkClick={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Logo or title */}
            <h1 className="text-xl font-bold ml-2 md:ml-0">CesiZen</h1>
        </header>
    );
}
