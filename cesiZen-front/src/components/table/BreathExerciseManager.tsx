// components/table/BreathExerciseManager.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { BreathExercise } from "@/types";

interface Props {
    exercises: BreathExercise[];
    setExercises: Dispatch<SetStateAction<BreathExercise[]>>;
    editingBreathId: number | null;
    setEditingBreathId: Dispatch<SetStateAction<number | null>>;
    onSubmit: (exercise: BreathExercise) => void;
    onDelete: (id: number) => void;
    setFormBreath: Dispatch<SetStateAction<BreathExercise | null>>;
    setCreateBreathDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BreathExerciseManager({
    exercises,
    setExercises,
    editingBreathId,
    setEditingBreathId,
    onSubmit,
    onDelete,
    setFormBreath,
    setCreateBreathDialogOpen
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion des exercices de respiration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button
                    className="mb-2"
                    onClick={() => {
                        setFormBreath({ id: 0, name: "", inspirationDuration: "", apneaDuration: "", expirationDuration: "" });
                        setCreateBreathDialogOpen(true);
                    }}
                >
                    + Créer un exercice
                </Button>
                <div className="space-y-2">
                    {exercises.map(ex => (
                        <div key={ex.id} className="border p-2 rounded-md">
                            {editingBreathId === ex.id ? (
                                <form
                                    className="space-y-2"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        onSubmit(ex);
                                    }}
                                >
                                    <div>
                                        <Label>Nom</Label>
                                        <Input
                                            value={ex.name}
                                            onChange={e => {
                                                const updated = exercises.map(b =>
                                                    b.id === ex.id ? { ...b, name: e.target.value } : b
                                                );
                                                setExercises(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Inspiration</Label>
                                        <Input
                                            value={ex.inspirationDuration}
                                            onChange={e => {
                                                const updated = exercises.map(b =>
                                                    b.id === ex.id ? { ...b, inspirationDuration: e.target.value } : b
                                                );
                                                setExercises(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Apnée</Label>
                                        <Input
                                            value={ex.apneaDuration}
                                            onChange={e => {
                                                const updated = exercises.map(b =>
                                                    b.id === ex.id ? { ...b, apneaDuration: e.target.value } : b
                                                );
                                                setExercises(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Expiration</Label>
                                        <Input
                                            value={ex.expirationDuration}
                                            onChange={e => {
                                                const updated = exercises.map(b =>
                                                    b.id === ex.id ? { ...b, expirationDuration: e.target.value } : b
                                                );
                                                setExercises(updated);
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit">Mettre à jour</Button>
                                        <Button type="button" variant="secondary" onClick={() => setEditingBreathId(null)}>
                                            Annuler
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 space-y-1">
                                        <div><strong>{ex.name}</strong></div>
                                        <div><strong>Inspiration:</strong> {ex.inspirationDuration}</div>
                                        <div><strong>Apnée:</strong> {ex.apneaDuration}</div>
                                        <div><strong>Expiration:</strong> {ex.expirationDuration}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <Button variant="outline" size="sm" onClick={() => setEditingBreathId(ex.id)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDelete(ex.id)}
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
