"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
    name: string;
    email: string;
    role: "user" | "admin";
};

type AuthContextType = {
    user: User | null;
    login: (email: string, role: "user" | "admin") => void;
    register: (name: string, email: string) => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for persisted user
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, role: "user" | "admin") => {
        const newUser = { name: "Test User", email, role };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        if (role === "admin") router.push("/admin");
        else router.push("/profile");
    };

    const register = (name: string, email: string) => {
        const newUser = { name, email, role: "user" as const };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/profile");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
