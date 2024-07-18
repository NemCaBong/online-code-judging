import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LogIn";
import { SignUpForm } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
