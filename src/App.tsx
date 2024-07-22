import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/Login/LogIn.tsx";
import { SignUpForm } from "./pages/SignUp/SignUp.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { TaskBoard } from "./pages/TaskBoard/TaskBoard.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
