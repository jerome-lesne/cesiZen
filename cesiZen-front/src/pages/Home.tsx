import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to CesiZen</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This is your dashboard homepage. Use the sidebar to navigate through the app.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Check user list</li>
                        <li>Update your settings</li>
                        <li>See system stats</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
