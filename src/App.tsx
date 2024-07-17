import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { LoginForm } from "./pages/LogIn";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;
