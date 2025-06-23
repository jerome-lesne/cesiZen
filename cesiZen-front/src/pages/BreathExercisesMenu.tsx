import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BreathExercise, BreathHistoryItem } from "@/types";
import { useAuth } from "@/context/AuthContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function BreathExercises() {
    const [exercises, setExercises] = useState<BreathExercise[]>([]);
    const [history, setHistory] = useState<BreathHistoryItem[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetch("http://localhost:8081/breath-exercise", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement des exercices");
                return res.json();
            })
            .then((data) => setExercises(data))
            .catch((err) => alert(err.message));
    }, []);

    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:8081/user-auth/get-breath-history/${user.id}`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement de l'historique");
                return res.json();
            })
            .then((data) => setHistory(data))
            .catch((err) => alert(err.message));
    }, [user]);

    return (
        <div className="p-4 flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Exercices de respiration</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {exercises.map((exercise) => (
                        <Button
                            key={exercise.id}
                            className="sm:w-96 w-full justify-start text-left h-fit"
                            variant="outline"
                            onClick={() => {
                                navigate(`/breath/${exercise.id}`);
                            }}
                        >
                            <div className="w-full flex flex-col justify-around">
                                <div>
                                    <h3 className="font-extrabold font-stretch-100% text-lg text-wrap">
                                        {exercise.name}
                                    </h3>
                                </div>
                                <div>
                                    <p>
                                        <strong>Inspiration :</strong>{" "}
                                        {exercise.inspirationDuration} sec
                                    </p>
                                    <p>
                                        <strong>Apnée :</strong> {exercise.apneaDuration} sec
                                    </p>
                                    <p>
                                        <strong>Expiration :</strong>{" "}
                                        {exercise.expirationDuration} sec
                                    </p>
                                </div>
                            </div>
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {user && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Mon Historique</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {history.length === 0 ? (
                            <p className="text-muted-foreground">
                                Aucun exercice effectué pour l’instant.
                            </p>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden sm:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-1/2 font-bold">
                                                    Nom de l'exercice
                                                </TableHead>
                                                <TableHead className="text-right font-bold">
                                                    Date
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {history.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell className="text-right text-muted-foreground text-sm">
                                                        {new Date(item.date).toLocaleString("fr-FR", {
                                                            dateStyle: "short",
                                                            timeStyle: "short",
                                                        })}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="space-y-2 sm:hidden">
                                    {history.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-xl p-3 bg-muted/50 flex justify-between items-start"
                                        >
                                            <div className="font-semibold">{item.name}</div>
                                            <div className="text-sm text-muted-foreground text-right">
                                                {new Date(item.date).toLocaleString("fr-FR", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
