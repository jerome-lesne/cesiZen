import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    firstName: string;
    name: string;
    mail: string;
    roles: string[];
};

type AuthContextType = {
    user: User | null;
    login: (mail: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;

    // Check if already logged in (cookie exists)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:8081/auth/me", {
                    credentials: "include",
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchProfile();
    }, []);

    const login = async (mail: string, password: string) => {
        const response = await fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
            credentials: "include", // send and receive cookies
        });

        if (!response.ok) throw new Error("Authentication failed");

        const userResponse = await fetch("http://localhost:8081/auth/me", {
            credentials: "include",
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user data after login");

        const userData = await userResponse.json();
        setUser(userData);
    };

    const logout = async () => {
        await fetch("http://localhost:8081/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
