import { createContext, useContext, useState } from "react";

type User = {
    id: number;
    email: string;
    roles: string[];
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (mail: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAuthenticated = !!token;

    const login = async (mail: string, password: string) => {
        const response = await fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });

        if (!response.ok) throw new Error("Authentication failed");

        const data = await response.json();
        const { token, userId, email, roles } = data;

        setToken(token);
        setUser({ id: userId, email: email, roles });

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ id: userId, email: mail, roles }));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
