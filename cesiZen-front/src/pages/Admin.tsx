import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface User {
    id: number;
    firstName: string;
    name: string;
    mail: string;
    address: string;
    city: string;
    zipCode: string;
    birthday: string;
    roles: string[];
    password?: string;
}

interface Role {
    id: number;
    name: string;
}

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formUser, setFormUser] = useState<User | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

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
            .catch(err => alert(err.message));
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
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

    const handleUpdate = async () => {
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

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">Erreur : {error}</div>;

    return (
        <div className="p-4 space-y-4">
            <Card className="overflow-x-auto hidden md:block">
                <CardHeader className="mb-2">
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="mb-2" onClick={() => {
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
                    }}>
                        + Créer un utilisateur
                    </Button>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Prénom</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Ville</TableHead>
                                <TableHead>Rôles</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.mail}</TableCell>
                                    <TableCell>{user.city}</TableCell>
                                    <TableCell className="flex flex-col justify-center gap-1">{user.roles.map((role) => (
                                        <Badge key={role} variant="outline" className="mr-1">
                                            {role}
                                        </Badge>
                                    ))}</TableCell>
                                    <TableCell className="space-x-1">
                                        <Button variant="secondary" size="sm" onClick={() => handleInfo(user)}>
                                            <Info className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
            {/* mobile */}
            <div className="md:hidden space-y-2">
                <CardHeader>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                </CardHeader>
                {users.map(user => (
                    <Card key={user.id}>
                        <CardHeader>
                            <CardTitle>{user.firstName} {user.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p><strong>Email:</strong> {user.mail}</p>
                            <p><strong>Ville:</strong> {user.city}</p>
                            <p><strong>Rôles:</strong> {user.roles.join(", ")}</p>
                            <div className="flex gap-2 mt-2">
                                <Button variant="secondary" size="sm" onClick={() => handleInfo(user)}>
                                    <Info className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modale d'infos */}
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

            {/* Modale d'édition */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier l’utilisateur</DialogTitle>
                    </DialogHeader>
                    {formUser && (
                        <form className="space-y-2" onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                            {["name", "firstName", "mail", "address", "city", "zipCode", "birthday"].map(field => (
                                <div key={field}>
                                    <Label className="capitalize">{field}</Label>
                                    <Input
                                        type={field === "birthday" ? "date" : field === "zipCode" ? "number" : "text"}
                                        value={(formUser as any)[field]}
                                        onChange={e =>
                                            setFormUser({ ...formUser, [field]: e.target.value })
                                        }
                                    />
                                </div>
                            ))}

                            <Label>Nouveau mot de passe</Label>
                            <Input
                                type="password"
                                value={formUser.password || ""}
                                onChange={e => setFormUser({ ...formUser, password: e.target.value })}
                            />
                            <div>
                                <Label>Rôles</Label>
                                <div className="border rounded-md p-2">
                                    {availableRoles.map((role) => (
                                        <div key={role.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`role-${role.name}`}
                                                checked={formUser.roles.includes(role.name)}
                                                onChange={() => {
                                                    const newRoles = formUser.roles.includes(role.name)
                                                        ? formUser.roles.filter(r => r !== role.name)
                                                        : [...formUser.roles, role.name];
                                                    setFormUser({ ...formUser, roles: newRoles });
                                                }}
                                                className="accent-blue-500"
                                            />
                                            <label htmlFor={`role-${role.name}`}>{role.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="secondary" type="button" onClick={() => setEditDialogOpen(false)}>Annuler</Button>
                                <Button type="submit">Enregistrer</Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
