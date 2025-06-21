import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Content } from "@/types/";
import { Textarea } from "../ui/textarea";

interface ContentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formContent: Content | null;
    setFormContent: (content: Content) => void;
    onSubmit: () => void;
}

export default function ContentDialog({
    open,
    onOpenChange,
    formContent,
    setFormContent,
    onSubmit,
}: ContentDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un contenu</DialogTitle>
                </DialogHeader>
                {formContent && (
                    <form
                        className="space-y-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <div key="title">
                            <Label className="capitalize">Titre</Label>
                            <Input
                                type="text"
                                onChange={(e) => setFormContent({ ...formContent, title: e.target.value })}
                            />
                        </div>
                        <div key="content">
                            <Label className="capitalize">Contenu</Label>
                            <Textarea
                                onChange={(e) => setFormContent({ ...formContent, content: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">Enregistrer</Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
