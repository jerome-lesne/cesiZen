import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserTable from "@/components/table/UserTable";
import UserDialog from "@/components/dialog/UserDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { Role, Content, User } from "@/types"
import ContentDialog from "@/components/dialog/ContentDialog";

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

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchContents();
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

            <Card>
                <CardHeader>
                    <CardTitle>Gestion des contenus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="mb-2"
                        onClick={() => {
                            setFormContent({
                                id: 0,
                                title: "",
                                content: ""
                            });
                            setCreateContentDialogOpen(true);
                        }}>+ Créer un Contenu</Button>
                    <div className="space-y-2">
                        {contents.map(content => (
                            <div key={content.id} className="border p-2 rounded-md">
                                {editingContentId === content.id ? (
                                    <form
                                        className="space-y-2"
                                        onSubmit={e => {
                                            e.preventDefault();
                                            handleUpdateContent(content);
                                        }}
                                    >
                                        <div>
                                            <Label>Titre</Label>
                                            <Input
                                                value={content.title}
                                                onChange={e => {
                                                    const updated = contents.map(c =>
                                                        c.id === content.id ? { ...c, title: e.target.value } : c
                                                    );
                                                    setContents(updated);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label>Contenu</Label>
                                            <Textarea
                                                rows={5}
                                                value={content.content}
                                                onChange={e => {
                                                    const updated = contents.map(c =>
                                                        c.id === content.id ? { ...c, content: e.target.value } : c
                                                    );
                                                    setContents(updated);
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit">Mettre à jour</Button>
                                            <Button type="button" variant="secondary" onClick={() => setEditingContentId(null)}>Annuler</Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{content.title}</h4>
                                            <p className="text-sm text-muted-foreground whitespace-pre-line">{content.content}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <Button variant="outline" size="sm" onClick={() => setEditingContentId(content.id)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteContent(content.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ContentDialog
                open={createContentDialogOpen}
                onOpenChange={setCreateContentDialogOpen}
                formContent={formContent}
                setFormContent={setFormContent}
                onSubmit={handleCreateContent}
            />
        </div>
    );
}
