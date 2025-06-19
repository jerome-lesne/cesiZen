import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Props = {
    children: JSX.Element;
    adminOnly?: boolean;
};

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-full">Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && (!user || !user.roles.includes("ADMIN"))) {
        // Tu peux rediriger vers une page d'erreur ou d'accueil, ici on fait juste une redirection simple
        return <Navigate to="/" replace />;
    }

    return children;
}
