import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "lucide-react";

interface User {
    name: string;
    firstName: string;
    birthday: string;
    address: string;
    zipCode: string;
    city: string;
    mail: string;
}

interface Props {
    user: User;
    onEdit: () => void;
}

export default function UserProfileCard({ user, onEdit }: Props) {
    return (
        <Card className="max-w-xl w-full">
            <CardHeader className="flex flex-row justify-center items-center w-full">
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <CardTitle>Mon Profil</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid gap-2">
                <p><strong>Nom :</strong> {user.name}</p>
                <p><strong>Prénom :</strong> {user.firstName}</p>
                <p><strong>Date de naissance :</strong> {user.birthday}</p>
                <p><strong>Adresse :</strong> {user.address}</p>
                <p><strong>Code postal :</strong> {user.zipCode}</p>
                <p><strong>Ville :</strong> {user.city}</p>
                <p><strong>Email :</strong> {user.mail}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={onEdit}>Modifier</Button>
            </CardFooter>
        </Card>
    );
}
