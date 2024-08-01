import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/client/Login/LogIn";
import { SignUpForm } from "./pages/client/SignUp/SignUp";
import { Dashboard } from "./pages/client/Dashboard/Dashboard";
import { TaskBoard } from "./pages/client/TaskBoard/TaskBoard";
import { ClassroomDetail } from "./pages/client/ClassroomDetail/ClassroomDetail";
import { CodingChallengeDetail } from "./pages/client/CodingChallengeDetail/CodingChallengeDetail";
import { AdminDashboard } from "./pages/admin/AdminDashboard/AdminDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/classrooms" element={<ClassroomDetail />} />
        <Route path="/challenges" element={<CodingChallengeDetail />} />
        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
