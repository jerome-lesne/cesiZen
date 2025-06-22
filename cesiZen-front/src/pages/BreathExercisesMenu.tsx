import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BreathExercise } from "@/types";

export default function BreathExercises() {
    const [exercises, setExercises] = useState<BreathExercise[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8081/admin/breath-exercise", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
                return res.json();
            })
            .then(data => setExercises(data))
            .catch(err => alert(err.message));
    }, []);

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Exercices de respiration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col items-center">
                    {exercises.map((exercise) => (
                        <Button
                            key={exercise.id}
                            className="w-5/6 justify-start text-left h-fit"
                            variant="outline"
                            onClick={() => {
                                navigate(`/breath/${exercise.id}`)
                                console.log("Clicked on exercise", exercise.id);
                            }}
                        >
                            <div className="w-full flex flex-col justify-around">
                                <div>
                                    <h3 className="font-extrabold font-stretch-120%">{exercise.name}</h3>
                                </div>
                                <div>
                                    <p><strong>Inspiration :</strong> {exercise.inspirationDuration} sec</p>
                                    <p><strong>Apnée :</strong> {exercise.apneaDuration} sec</p>
                                    <p><strong>Expiration :</strong> {exercise.expirationDuration} sec</p>
                                </div>
                            </div>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
