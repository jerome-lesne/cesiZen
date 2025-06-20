import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Role, User } from "@/types/";

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formUser: User | null;
    setFormUser: (user: User) => void;
    availableRoles: Role[];
    onSubmit: () => void;
}

export default function UserDialog({
    open,
    onOpenChange,
    formUser,
    setFormUser,
    availableRoles,
    onSubmit,
}: UserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{formUser?.id === 0 ? "Créer un utilisateur" : "Modifier l’utilisateur"}</DialogTitle>
                </DialogHeader>

                {formUser && (
                    <form
                        className="space-y-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        {["name", "firstName", "mail", "address", "city", "zipCode", "birthday"].map((field) => (
                            <div key={field}>
                                <Label className="capitalize">{field}</Label>
                                <Input
                                    type={field === "birthday" ? "date" : field === "zipCode" ? "number" : "text"}
                                    value={(formUser as any)[field]}
                                    onChange={(e) => setFormUser({ ...formUser, [field]: e.target.value })}
                                />
                            </div>
                        ))}

                        <Label>Nouveau mot de passe</Label>
                        <Input
                            type="password"
                            value={formUser.password || ""}
                            onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
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
                                                    ? formUser.roles.filter((r) => r !== role.name)
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
                            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">Enregistrer</Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
