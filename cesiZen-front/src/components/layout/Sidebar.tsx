import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, UserPlus, UserPenIcon, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Props = {
    isMobile?: boolean;
};

export default function Sidebar({ isMobile = false }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { href: "/", label: "Accueil", icon: Home },
        { href: "/register", label: "S'inscrire", icon: UserPlus, guestOnly: true },
        { href: "/login", label: "Se Connecter", icon: LogIn, guestOnly: true },
        { href: "/user-profile", label: "Profile", icon: UserPenIcon, protected: true },
        {
            label: "Se Déconnecter",
            icon: LogOut,
            onClick: handleLogout,
            protected: true,
        },
    ];

    return (
        <aside
            className={`h-full flex flex-col space-y-4 p-4 ${isMobile ? "" : "w-64 bg-gray-900 text-white hidden md:flex"}`}
        >
            <nav className="flex flex-col gap-2">
                {navItems
                    .filter(item => {
                        if (item.protected && !isAuthenticated) return false;
                        if (item.guestOnly && isAuthenticated) return false;
                        return true;
                    })
                    .map(({ href, label, icon: Icon, onClick }) =>
                        href ? (
                            <Link
                                key={href}
                                to={href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted-foreground/10 transition",
                                    location.pathname === href && "bg-muted-foreground/10 font-medium"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </Link>
                        ) : (
                            <button
                                key={label}
                                onClick={onClick}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted-foreground/10 transition text-left"
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </button>
                        )
                    )}
            </nav>
        </aside>
    );
}
