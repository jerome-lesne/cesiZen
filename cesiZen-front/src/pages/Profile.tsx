import { useState } from "react";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import UserProfileCard from "@/components/infoCards/UserProfileCard";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import PasswordCard from "@/components/infoCards/PasswordCard";

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const [user, setUser] = useState({
        name: "Dupont",
        firstName: "Jean",
        birthday: "1990-05-15",
        address: "1 rue de la République",
        zipCode: "75001",
        city: "Paris",
        mail: "jean.dupont@example.com",
    });

    const handleUpdate = (newData: typeof user) => {
        setUser(newData);
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
