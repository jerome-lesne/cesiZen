import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div className="flex items-center justify-center h-full">Chargement...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}
