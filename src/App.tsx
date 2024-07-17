import { ThemeProvider } from "@/components/theme-provider";
// import { Button } from "./components/ui/button";
import { LoginForm } from "./pages/LogIn";
import { Route, Routes } from "react-router-dom";
import { SignUpForm } from "./pages/SignUp";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
