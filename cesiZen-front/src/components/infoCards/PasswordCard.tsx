import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface Props {
    onEdit: () => void;
}

export default function PasswordCard({ onEdit }: Props) {
    return (
        <Card className="max-w-xl w-full">
            <CardHeader className="flex flex-row justify-center items-center w-full">
                <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <CardTitle>Mot de passe</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="tracking-widest text-xl text-muted-foreground select-none">••••••••••••••</p>
            </CardContent>
            <CardFooter>
                <Button onClick={onEdit}>Modifier</Button>
            </CardFooter>
        </Card>
    );
}
