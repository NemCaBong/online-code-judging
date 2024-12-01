import { Input } from "@/components/ui/input.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRightIcon,
  CircleUserRound,
  CodeXml,
  LogOut,
  PanelLeft,
  Search,
  ShieldCheck,
  Swords,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useMemo } from "react";
import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AuthContext } from "@/contexts/auth.context";

interface HeaderProps {
  pathString?: string;
}

export function Header({ pathString }: HeaderProps) {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  const breadcrumbs = useMemo(() => {
    if (!pathString) return [{ href: "/dashboard", label: "Dashboard" }];
    const pathnames = pathString.split("/").filter((x) => x);
    return [
      { href: "/dashboard", label: "Dashboard" },
      ...pathnames
        .map((name, index) => {
          // Check if the current segment is preceded by "classes"
          if (index > 0 && pathnames[index - 1] === "classes") {
            const href = `/${pathnames.slice(index - 1, index + 1).join("/")}`;
            const label = name.charAt(0).toUpperCase() + name.slice(1);
            return { href, label };
          }

          // Skip "classes" and "exercises" in the breadcrumb
          if (name === "classes") return null;

          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = name.charAt(0).toUpperCase() + name.slice(1);
          return { href, label };
        })
        .filter(Boolean), // Remove null entries
    ];
  }, [pathString]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <CodeXml className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Online Code Judging</span>
            </Link>
            <Link
              to="/challenges"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Swords className="h-5 w-5" />
              Challenges
            </Link>
            {user.role === "ADMIN" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShieldCheck className="h-5 w-5" />
                To Admin
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.length === 1 ? (
              breadcrumbs[0] && (
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbs[0].label}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            ) : breadcrumbs.length === 2 ? (
              breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="list-none">
                      <ChevronRightIcon className="h-4 w-4" />
                    </BreadcrumbSeparator>
                  )}
                  <BreadcrumbItem>
                    {item && index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink>
                        <Link to={item?.href || "#"}>{item?.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))
            ) : (
              <>
                {breadcrumbs[0] && (
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      <Link to={breadcrumbs[0].href}>
                        {breadcrumbs[0].label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {breadcrumbs.length > 3 && (
                  <>
                    <BreadcrumbSeparator className="list-none">
                      <ChevronRightIcon className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <DotsHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {breadcrumbs.slice(1, -2).map((item, index) => (
                            <DropdownMenuItem key={index}>
                              <Link to={item?.href || "#"}>{item?.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                  </>
                )}
                {breadcrumbs.slice(-2).map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator className="list-none">
                      <ChevronRightIcon className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {item && index === breadcrumbs.slice(-2).length - 1 ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink>
                          <Link to={item?.href || "#"}>{item?.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <CircleUserRound
              name="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.role === "ADMIN" && (
            <DropdownMenuItem>
              <Link to="/admin/dashboard">To Admin</Link>
              <ShieldCheck className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Logout
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
