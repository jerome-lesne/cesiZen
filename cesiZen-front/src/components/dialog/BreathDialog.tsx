import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BreathExercise } from "@/types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formBreath: BreathExercise | null;
    setFormBreath: (value: BreathExercise | null) => void;
    onSubmit: () => void;
}

export default function BreathExerciseDialog({
    open,
    onOpenChange,
    formBreath,
    setFormBreath,
    onSubmit
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nouvel exercice de respiration</DialogTitle>
                </DialogHeader>
                {formBreath && (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            onSubmit();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <Label>Nom</Label>
                            <Input
                                value={formBreath.name}
                                onChange={e => setFormBreath({ ...formBreath, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Inspiration</Label>
                            <Input
                                value={formBreath.inspirationDuration}
                                onChange={e => setFormBreath({ ...formBreath, inspirationDuration: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Apnée</Label>
                            <Input
                                value={formBreath.apneaDuration}
                                onChange={e => setFormBreath({ ...formBreath, apneaDuration: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Expiration</Label>
                            <Input
                                value={formBreath.expirationDuration}
                                onChange={e => setFormBreath({ ...formBreath, expirationDuration: e.target.value })}
                            />
                        </div>
                        <Button type="submit">Créer</Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
