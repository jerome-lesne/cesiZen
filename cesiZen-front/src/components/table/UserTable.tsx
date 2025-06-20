import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Edit, Trash2 } from "lucide-react"
import { User } from "@/types"

interface Props {
    users: User[]
    onInfo: (user: User) => void
    onEdit: (user: User) => void
    onDelete: (id: number) => void
    onCreate: () => void
}

export default function UserTable({ users, onInfo, onEdit, onDelete, onCreate }: Props) {
    return (
        <>
            {/* Desktop */}
            <Card className="overflow-x-auto hidden md:block">
                <CardHeader className="mb-2">
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="mb-2" onClick={onCreate}>+ Créer un utilisateur</Button>
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
                                    <TableCell className="flex flex-col justify-center gap-1">
                                        {user.roles.map(role => (
                                            <Badge key={role} variant="outline">{role}</Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell className="space-x-1">
                                        <Button variant="secondary" size="sm" onClick={() => onInfo(user)}>
                                            <Info className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Mobile */}
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
                                <Button variant="secondary" size="sm" onClick={() => onInfo(user)}>
                                    <Info className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
