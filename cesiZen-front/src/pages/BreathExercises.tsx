import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BreathExercise } from "@/types";

type Phase = "inspiration" | "apnea" | "expiration" | null;

export default function BreathExercisePage() {
    const { id } = useParams();
    const [exercise, setExercise] = useState<BreathExercise | null>(null);
    const [phase, setPhase] = useState<Phase>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8081/breath-exercise`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement");
                return res.json();
            })
            .then((data: BreathExercise[]) => {
                const found = data.find((ex) => ex.id.toString() === id);
                if (found) setExercise(found);
                else alert("Exercice introuvable");
            })
            .catch((err) => alert(err.message));
    }, [id]);

    useEffect(() => {
        if (!running || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [running, timeLeft]);

    useEffect(() => {
        if (!running || !exercise) return;

        if (timeLeft === 0) {
            if (phase === "inspiration") {
                setPhase("apnea");
                setTimeLeft(parseInt(exercise.apneaDuration));
            } else if (phase === "apnea") {
                setPhase("expiration");
                setTimeLeft(parseInt(exercise.expirationDuration));
            } else if (phase === "expiration") {
                setRunning(false);
                setPhase(null);
            }
        }
    }, [timeLeft, phase, exercise, running]);

    const startExercise = () => {
        if (!exercise) return;
        setPhase("inspiration");
        setTimeLeft(parseInt(exercise.inspirationDuration));
        setRunning(true);
    };

    return (
        <div className="p-4">
            <Card className="bg-green-100">
                <CardHeader>
                    <CardTitle>{exercise ? exercise.name : "no-name"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    {exercise && !running && (
                        <Button onClick={startExercise}>Démarrer l’exercice</Button>
                    )}

                    {running && (
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold capitalize">
                                {(() => {
                                    switch (phase) {
                                        case "inspiration":
                                            return "Inspiration 🫁";
                                        case "apnea":
                                            return "Apnée 🛑";
                                        case "expiration":
                                            return "Expiration 🌬️";
                                        default:
                                            return "Préparation";
                                    }
                                })()}
                            </h2>
                            <div className="text-5xl font-mono">{timeLeft}s</div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/breath")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour au menu exercices
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
