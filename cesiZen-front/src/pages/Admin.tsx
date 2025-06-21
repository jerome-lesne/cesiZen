import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserTable from "@/components/table/UserTable";
import UserDialog from "@/components/dialog/UserDialog";
import { Role, Content, User, BreathExercise } from "@/types"
import ContentDialog from "@/components/dialog/ContentDialog";
import ContentManager from "@/components/table/contentManager";
import BreathExerciseManager from "@/components/table/BreathExerciseManager";
import BreathExerciseDialog from "@/components/dialog/BreathDialog";

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formUser, setFormUser] = useState<User | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

    const [contents, setContents] = useState<Content[]>([]);
    const [editingContentId, setEditingContentId] = useState<number | null>(null);
    const [createContentDialogOpen, setCreateContentDialogOpen] = useState(false);
    const [formContent, setFormContent] = useState<Content | null>(null);

    const [breathExercises, setBreathExercises] = useState<BreathExercise[]>([]);
    const [editingBreathId, setEditingBreathId] = useState<number | null>(null);
    const [formBreath, setFormBreath] = useState<BreathExercise | null>(null);
    const [createBreathDialogOpen, setCreateBreathDialogOpen] = useState(false);

    const fetchUsers = () => {
        setLoading(true);
        fetch("http://localhost:8081/admin/users", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Échec du chargement des utilisateurs");
                return res.json();
            })
            .then((data: User[]) => setUsers(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    const fetchRoles = () => {
        setLoading(true);
        fetch("http://localhost:8081/admin/role", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Échec chargement des rôles");
                return res.json();
            })
            .then((data: Role[]) => setAvailableRoles(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    const fetchContents = () => {
        fetch("http://localhost:8081/admin/content", { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement contenus");
                return res.json();
            })
            .then((data: Content[]) => setContents(data))
            .catch(err => alert(err.message));
    };

    const fetchBreathExercises = () => {
        fetch("http://localhost:8081/admin/breath-exercise", { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Erreur chargement exercices de réspiration");
                return res.json()
            })
            .then((data: BreathExercise[]) => setBreathExercises(data))
            .catch(err => alert(err.message));
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchContents();
        fetchBreathExercises();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
        try {
            const res = await fetch(`http://localhost:8081/admin/users/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Suppression échouée");
            fetchUsers();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEdit = (user: User) => {
        setFormUser({ ...user });
        setEditDialogOpen(true);
    };

    const handleInfo = (user: User) => {
        setSelectedUser(user);
        setInfoDialogOpen(true);
    };

    const handleCreateOrUpdateUser = async () => {
        if (!formUser) return;
        const isNew = formUser.id === 0;
        const url = isNew
            ? "http://localhost:8081/admin/users/create"
            : `http://localhost:8081/admin/users/update/${formUser.id}`;
        const method = isNew ? "POST" : "PATCH";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formUser),
            });
            if (!res.ok) throw new Error("Échec de l'enregistrement");
            setEditDialogOpen(false);
            fetchUsers();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleCreateContent = async () => {
        const url = "http://localhost:8081/admin/content"
        const method = "POST"
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formContent),
            })
            if (!res.ok) throw new Error("Échec de l'enregistrement");
            setCreateContentDialogOpen(false);
            fetchContents();
        } catch (err: any) {
            alert(err.message);
        }
    }

    const handleUpdateContent = async (content: Content) => {
        const url = `http://localhost:8081/admin/content/${content.id}`;
        const method = "PATCH";
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(content),
            });
            if (!res.ok) throw new Error("Échec de l'enregistrement du contenu");
            fetchContents();
            setEditingContentId(null);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDeleteContent = async (id: number) => {
        if (!confirm("Supprimer ce contenu ?")) return;
        try {
            const res = await fetch(`http://localhost:8081/admin/content/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Suppression échouée");
            fetchContents();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleCreateBreath = async () => {
        const res = await fetch("http://localhost:8081/admin/breath-exercise", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formBreath),
        });
        if (res.ok) {
            setCreateBreathDialogOpen(false);
            fetchBreathExercises();
        } else {
            alert("Erreur lors de la création");
        }
    };

    const handleUpdateBreath = async (breath: BreathExercise) => {
        const res = await fetch(`http://localhost:8081/admin/breath-exercise/update/${breath.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(breath),
        });
        if (res.ok) {
            fetchBreathExercises();
            setEditingBreathId(null);
        } else {
            alert("Erreur lors de la mise à jour");
        }
    };

    const handleDeleteBreath = async (id: number) => {
        if (!confirm("Supprimer cet exercice ?")) return;
        const res = await fetch(`http://localhost:8081/admin/breath-exercise/delete/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) fetchBreathExercises();
        else alert("Erreur lors de la suppression");
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">Erreur : {error}</div>;

    return (
        <div className="p-4 space-y-6">
            <UserTable
                users={users}
                onInfo={handleInfo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={() => {
                    setFormUser({
                        id: 0,
                        name: "",
                        firstName: "",
                        mail: "",
                        address: "",
                        city: "",
                        zipCode: "",
                        birthday: "",
                        roles: [],
                        password: "",
                    });
                    setEditDialogOpen(true);
                }}
            />

            <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Informations de l’utilisateur</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-1">
                            <p><strong>Nom:</strong> {selectedUser.name}</p>
                            <p><strong>Prénom:</strong> {selectedUser.firstName}</p>
                            <p><strong>Email:</strong> {selectedUser.mail}</p>
                            <p><strong>Adresse:</strong> {selectedUser.address}</p>
                            <p><strong>Code postal:</strong> {selectedUser.zipCode}</p>
                            <p><strong>Ville:</strong> {selectedUser.city}</p>
                            <p><strong>Date de naissance:</strong> {selectedUser.birthday}</p>
                            <p><strong>Rôles:</strong> {selectedUser.roles.join(", ")}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <UserDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                formUser={formUser}
                setFormUser={setFormUser}
                availableRoles={availableRoles}
                onSubmit={handleCreateOrUpdateUser}
            />

            <ContentManager
                contents={contents}
                setContents={setContents}
                editingContentId={editingContentId}
                setEditingContentId={setEditingContentId}
                onSubmit={handleUpdateContent}
                onDelete={handleDeleteContent}
                setCreateContentDialogOpen={setCreateContentDialogOpen}
                setFormContent={setFormContent}
            />

            <ContentDialog
                open={createContentDialogOpen}
                onOpenChange={setCreateContentDialogOpen}
                formContent={formContent}
                setFormContent={setFormContent}
                onSubmit={handleCreateContent}

            />

            <BreathExerciseManager
                exercises={breathExercises}
                setExercises={setBreathExercises}
                editingBreathId={editingBreathId}
                setEditingBreathId={setEditingBreathId}
                onSubmit={handleUpdateBreath}
                onDelete={handleDeleteBreath}
                setFormBreath={setFormBreath}
                setCreateBreathDialogOpen={setCreateBreathDialogOpen}
            />

            <BreathExerciseDialog
                open={createBreathDialogOpen}
                onOpenChange={setCreateBreathDialogOpen}
                formBreath={formBreath}
                setFormBreath={setFormBreath}
                onSubmit={handleCreateBreath}
            />
        </div>
    );
}
