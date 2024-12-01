import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, CodeXml, Gauge, LogOut, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

export function AdminHeader() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <CodeXml className="h-6 w-6" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <Link
          to="/admin/create-challenge"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Challenge
        </Link>
        <Link
          to="/create-exercise"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Exercise
        </Link>
        <Link
          to="/admin/create-class"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Class
        </Link>
        {/* <Link
          to="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Customers
        </Link>
        <Link
          to="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Analytics
        </Link> */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <CodeXml className="h-6 w-6" />
              <span className="sr-only">Online Code Judge</span>
            </Link>
            <Link
              to="/admin/create-challenge"
              className="text-muted-foreground hover:text-foreground"
            >
              Challenge
            </Link>
            <Link
              to="/admin/create-exercise"
              className="text-muted-foreground hover:text-foreground"
            >
              Exercise
            </Link>
            <Link
              to="/admin/create-class"
              className="text-muted-foreground hover:text-foreground"
            >
              Class
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={"/dashboard"}>To Dashboard</Link>
              <Gauge className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              Logout
              <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
