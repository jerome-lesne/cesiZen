import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialForm = {
    name: "",
    firstName: "",
    birthday: "",
    address: "",
    zipCode: "",
    city: "",
    mail: "",
    password: "",
    confirmPassword: "",
};

export default function RegisterForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState(initialForm);
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

        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/.test(form.password)
        ) {
            newErrors.password =
                "Le mot de passe doit respecter les critères ci-dessous :";
        }

        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
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
            const res = await fetch("http://localhost:8081/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setResult("Compte créé avec succès !");
                setForm(initialForm);
                setTouched({});
                navigate("/login");
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
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Créer un compte</CardTitle>
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
                        ["password", "Mot de passe"],
                        ["confirmPassword", "Confirmer le mot de passe"],
                    ].map(([name, label]) => (
                        <div key={name}>
                            <Label htmlFor={name} className="mb-1">{label}</Label>
                            <Input
                                id={name}
                                name={name}
                                type={
                                    name === "password" || name === "confirmPassword"
                                        ? "password"
                                        : name === "birthday"
                                            ? "date"
                                            : "text"
                                }
                                value={(form as any)[name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {name === "password" && touched.password && errors.password && (
                                <p className="text-sm text-red-500 mb-1">{errors.password}</p>
                            )}
                            {name === "password" && (
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
                            )}
                            {name !== "password" && touched[name] && errors[name] && (
                                <p className="text-sm text-red-500">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    <Button type="submit" disabled={!isValid || loading}>
                        {loading ? "Envoi en cours..." : "Créer le compte"}
                    </Button>

                    {result && (
                        <p className="text-sm text-center text-muted-foreground">{result}</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
