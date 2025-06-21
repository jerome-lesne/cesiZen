import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";
import { Content } from "@/types";

interface Props {
    contents: Content[];
    setContents: Dispatch<SetStateAction<Content[]>>;
    editingContentId: number | null;
    setEditingContentId: Dispatch<SetStateAction<number | null>>;
    onSubmit: (content: Content) => void;
    onDelete: (id: number) => void;
    setCreateContentDialogOpen: Dispatch<SetStateAction<boolean>>;
    setFormContent: Dispatch<SetStateAction<Content | null>>;
}

export default function ContentManager({
    contents,
    setContents,
    editingContentId,
    setEditingContentId,
    onSubmit,
    onDelete,
    setFormContent,
    setCreateContentDialogOpen
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion des contenus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button
                    className="mb-2"
                    onClick={() => {
                        setFormContent({ id: 0, title: "", content: "" });
                        setCreateContentDialogOpen(true);
                    }}
                >
                    + Créer un Contenu
                </Button>
                <div className="space-y-2">
                    {contents.map(content => (
                        <div key={content.id} className="border p-2 rounded-md">
                            {editingContentId === content.id ? (
                                <form
                                    className="space-y-2"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        onSubmit(content);
                                    }}
                                >
                                    <div>
                                        <Label>Titre</Label>
                                        <Input
                                            value={content.title}
                                            onChange={e => {
                                                const updated = contents.map(c =>
                                                    c.id === content.id ? { ...c, title: e.target.value } : c
                                                );
                                                setContents(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Contenu</Label>
                                        <Textarea
                                            rows={5}
                                            value={content.content}
                                            onChange={e => {
                                                const updated = contents.map(c =>
                                                    c.id === content.id ? { ...c, content: e.target.value } : c
                                                );
                                                setContents(updated);
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit">Mettre à jour</Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setEditingContentId(null)}
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{content.title}</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                                            {content.content}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingContentId(content.id)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDelete(content.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
