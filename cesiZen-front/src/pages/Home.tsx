import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonStanding } from "lucide-react";

type ContentItem = {
    id: number;
    title: string;
    content: string;
};

export default function Home() {
    const [contents, setContents] = useState<ContentItem[]>([]);

    useEffect(() => {
        fetch("http://localhost:8081/content", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load content");
                return res.json();
            })
            .then((data: ContentItem[]) => setContents(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex items-center">
                    <PersonStanding className="w-10 h-10" />
                    <CardTitle className="font-bold text-4xl">Bienvenue sur CesiZen</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-shadow-slate-700 text-xl">
                        CesiZen est l'application qui prends soins de votre santé mentale, pratiquez des exercises de réspiration lisez des articles sur la santé mentale et bien plus !
                    </p>
                </CardContent>
            </Card>

            <Card className="px-4 bg-accent">
                <CardHeader className="font-bold text-xl">
                    <CardTitle>Derniers articles</CardTitle>
                </CardHeader>
                {contents.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-line">
                                {item.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </Card>
        </div>
    );
}
