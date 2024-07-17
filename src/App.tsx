import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Online Code Judging
      </h1>
      <Button variant="default">Click me</Button>
    </ThemeProvider>
  );
}

export default App;
