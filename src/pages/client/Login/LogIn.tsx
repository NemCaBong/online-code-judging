import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";

// Define a Zod schema for the form
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface DecodedToken {
  email: string;
  name: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
  statusCode: number;
  message: string;
}

export function LoginForm() {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginFormInputs>({
    mutationFn: async (loginData) => {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });
      return response.data;
    },

    onSuccess: (data) => {
      const decodedToken: DecodedToken = jwtDecode(data.access_token);
      setUser(decodedToken);
      setIsLoggedIn(true);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_info", JSON.stringify(decodedToken));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        `Login failed. Please check your credentials. ${error.message}`
      );
      // Handle error (e.g., show a notification)
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form submitted:", data);
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
