import { useEffect, useState } from "react";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import UserProfileCard from "@/components/infoCards/UserProfileCard";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import PasswordCard from "@/components/infoCards/PasswordCard";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    const [editing, setEditing] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const [localUser, setLocalUser] = useState(() => ({
        name: user?.name || "",
        firstName: user?.firstName || "",
        birthday: user?.birthday || "",
        address: user?.address || "",
        zipCode: user?.zipCode || "",
        city: user?.city || "",
        mail: user?.mail || "",
    }));

    useEffect(() => {
        if (user) {
            setLocalUser({
                name: user.name,
                firstName: user.firstName,
                birthday: user.birthday,
                address: user.address,
                zipCode: user.zipCode,
                city: user.city,
                mail: user.mail,
            });
        }
    }, [user]);

    const handleUpdate = (newData: typeof localUser) => {
        setLocalUser(newData);
        setEditing(false);
    };

    return (
        <div className="p-4 flex flex-col justify-center items-center gap-4">
            {editing ? (
                <UpdateProfileForm initialData={localUser} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
            ) : (
                <UserProfileCard user={localUser} onEdit={() => setEditing(true)} />
            )}
            {editingPassword ? (
                <ChangePasswordForm onSubmit={() => setEditingPassword(false)} onCancel={() => setEditingPassword(false)} />
            ) : (
                <PasswordCard onEdit={() => setEditingPassword(true)} />
            )}
        </div>
    );
}
