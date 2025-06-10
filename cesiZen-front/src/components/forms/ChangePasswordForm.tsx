import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ChangePasswordForm({ onSubmit, onCancel }: Props) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const isValidPassword = (pwd: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/.test(pwd);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidPassword(password)) {
            setError("Mot de passe invalide.");
            return;
        }
        if (password !== confirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setError("");
        onSubmit();
    };

    return (
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <Label htmlFor="password" className="mb-1">Nouveau mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-xs text-muted-foreground">
                            <p>Le mot de passe doit contenir au moins :</p>
                            <ul className="ml-4 list-disc">
                                <li>12 caractères</li>
                                <li>Une minuscule</li>
                                <li>Une majuscule</li>
                                <li>Un chiffre</li>
                                <li>Un caractère spécial</li>
                            </ul>

                        </div>
                    </div>
                    <div>
                        <Label htmlFor="confirm" className="mb-1">Confirmer</Label>
                        <Input
                            id="confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex gap-2 justify-end">
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            Annuler
                        </Button>
                        <Button type="submit">Valider</Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    );
}
