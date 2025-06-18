import { useState } from "react";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import UserProfileCard from "@/components/infoCards/UserProfileCard";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import PasswordCard from "@/components/infoCards/PasswordCard";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user, setUser } = useAuth();

    const [editing, setEditing] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    if (!user) return null;

    const handleUpdate = (newData: Partial<typeof user>) => {
        setUser(prev => prev ? { ...prev, ...newData } : null);
        setEditing(false);
    };

    return (
        <div className="p-4 flex flex-col justify-center items-center gap-4">
            {editing ? (
                <UpdateProfileForm initialData={user} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
            ) : (
                <UserProfileCard user={user} onEdit={() => setEditing(true)} />
            )}
            {editingPassword ? (
                <ChangePasswordForm onSubmit={() => setEditingPassword(false)} onCancel={() => setEditingPassword(false)} />
            ) : (
                <PasswordCard onEdit={() => setEditingPassword(true)} />
            )}
        </div>
    );
}
