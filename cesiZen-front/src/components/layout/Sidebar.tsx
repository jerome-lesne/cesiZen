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

    const navItems = [
        { href: "/", label: "Acceuil", icon: Home },
        { href: "/register", label: "S'inscrire", icon: UserPlus },
        { href: "/login", label: "Se Connecter", icon: LogIn },
    ];
    const authNavItems = [
        { href: "/user-profile", label: "Profile", icon: UserPenIcon },
    ]

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <aside
            className={`h-full flex flex-col space-y-4 p-4 ${isMobile ? "" : "w-64 bg-gray-900 text-white hidden md:flex"
                }`}
        >
            <nav className="flex flex-col gap-2">
                <div>
                    {navItems.map(({ href, label, icon: Icon }) => (
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
                    ))}
                </div>
                <div>
                    {isAuthenticated && authNavItems.map(({ href, label, icon: Icon }) => (
                        <>
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
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted-foreground/10 transition text-left"
                            >
                                <LogOut className="w-5 h-5" />
                                Se Déconnecter
                            </button>
                        </>

                    ))}
                </div>
            </nav>
        </aside>
    );
}
