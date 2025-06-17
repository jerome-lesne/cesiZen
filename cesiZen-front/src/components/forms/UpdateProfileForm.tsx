import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UpdateProfileFormProps {
    initialData: {
        name: string;
        firstName: string;
        birthday: string;
        address: string;
        zipCode: string;
        city: string;
        mail: string;
    };
    onSubmit?: (data: any) => void;
    onCancel: () => void;
}

export default function UpdateProfileForm({ initialData, onSubmit, onCancel }: UpdateProfileFormProps) {
    const [form, setForm] = useState(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
        validateForm();
    }, [form]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = "Le nom est requis.";
        if (!form.firstName.trim()) newErrors.firstName = "Le prénom est requis.";

        if (!form.birthday) {
            newErrors.birthday = "La date de naissance est requise.";
        } else if (new Date(form.birthday) >= new Date()) {
            newErrors.birthday = "La date de naissance doit être dans le passé.";
        }

        if (!form.address.trim()) newErrors.address = "L'adresse est requise.";

        if (!/^\d{5}$/.test(form.zipCode)) {
            newErrors.zipCode = "Le code postal doit comporter exactement 5 chiffres.";
        }

        if (!form.city.trim()) newErrors.city = "La ville est requise.";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail)) {
            newErrors.mail = "Format de courriel invalide.";
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(
            Object.keys(form).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<string, boolean>)
        );

        if (!isValid) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:8081/user-auth/update-profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setResult("Profil mis à jour avec succès !");
                onSubmit?.(form);
            } else {
                const errorData = await res.json();
                setResult("Erreur : " + (errorData.message || "inconnue"));
            }
        } catch (err) {
            setResult("Erreur réseau");
        }

        setLoading(false);
    };

    return (
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardTitle>Modifier mon profil</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
                    {[
                        ["name", "Nom"],
                        ["firstName", "Prénom"],
                        ["birthday", "Date de naissance"],
                        ["address", "Adresse"],
                        ["zipCode", "Code postal"],
                        ["city", "Ville"],
                        ["mail", "Email"],
                    ].map(([name, label]) => (
                        <div key={name}>
                            <Label htmlFor={name} className="mb-1">{label}</Label>
                            <Input
                                id={name}
                                name={name}
                                type={name === "birthday" ? "date" : "text"}
                                value={(form as any)[name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched[name] && errors[name] && (
                                <p className="text-sm text-red-500">{errors[name]}</p>
                            )}
                        </div>
                    ))}


                    <div className="flex gap-2 justify-end">
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={!isValid || loading}>
                            {loading ? "Mise à jour..." : "Valider"}
                        </Button>
                    </div>
                    {result && (
                        <p className="text-sm text-center text-muted-foreground">{result}</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
