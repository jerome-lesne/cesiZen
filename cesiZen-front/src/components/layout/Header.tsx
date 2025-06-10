import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Header() {
    return (
        <header className="w-full h-16 bg-gray-800 text-white flex items-center px-4 shadow justify-between md:justify-start">
            {/* Mobile menu trigger */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-gray-900 text-white">
                        <Sidebar isMobile />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Logo or title */}
            <h1 className="text-xl font-bold ml-2 md:ml-0">CesiZen</h1>
        </header>
    );
}
