import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ChangePasswordForm({ onSubmit, onCancel }: Props) {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
    const [touched, setTouched] = useState<{ password?: boolean; confirm?: boolean }>({});
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const isValidPassword = (pwd: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/.test(pwd);

    useEffect(() => {
        const newErrors: typeof errors = {};

        if (!isValidPassword(password)) {
            newErrors.password = "Le mot de passe ne respecte pas les critères.";
        }

        if (confirm !== password) {
            newErrors.confirm = "Les mots de passe ne correspondent pas.";
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [password, confirm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ password: true, confirm: true });
        if (!isValid) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:8081/user-auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    newPassword: password,
                    oldPassword: oldPassword
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Erreur lors du changement de mot de passe.");
            }

            setResult("Mot de passe changé avec succès !");
            onSubmit();
        } catch (err: any) {
            setResult(err.message || "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
                    <div>
                        <Label htmlFor="oldPassword">Ancien mot de passe</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, oldPassword: true }))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Nouveau mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                        />
                        {touched.password && errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
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
                        <Label htmlFor="confirm">Confirmer</Label>
                        <Input
                            id="confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
                        />
                        {touched.confirm && errors.confirm && (
                            <p className="text-sm text-red-500">{errors.confirm}</p>
                        )}
                    </div>

                    {result && <p className="text-sm text-muted-foreground text-center">{result}</p>}

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={!isValid || loading}>
                            {loading ? "Envoi..." : "Valider"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
