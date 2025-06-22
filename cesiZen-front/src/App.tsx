import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/util/ProtectedRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import BreathExercisesMenu from "./pages/BreathExercisesMenu";
import BreathExercises from "./pages/BreathExercises";

function App() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/user-profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            } />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <Admin />
                                </ProtectedRoute>
                            } />
                        <Route path="/breath" element={<BreathExercisesMenu />} />
                        <Route path="/breath/:id" element={<BreathExercises />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
