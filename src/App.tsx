import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/client/Login/LogIn";
import { SignUpForm } from "./pages/client/SignUp/SignUp";
import { Dashboard } from "./pages/client/Dashboard/Dashboard";
import { TaskBoard } from "./pages/client/TaskBoard/TaskBoard";
import { ClassroomDetail } from "./pages/client/ClassroomDetail/ClassroomDetail";
import { CodingChallengeDetail } from "./pages/client/CodingChallengeDetail/CodingChallengeDetail";
import { AdminDashboard } from "./pages/admin/AdminDashboard/AdminDashboard";
import { AdminClassroom } from "./pages/admin/AdminClassroom/AdminClassroom";
import { AdminGradingPage } from "./pages/admin/AdminGradingPage/AdminGradingPage";
import { AdminCreateChallenge } from "./pages/admin/AdminCreateChallenge/AdminCreateChallenge";
import { AdminCreateExercise } from "./pages/admin/AdminCreateExercise/AdminCreateExercise";
import { ChallengesList } from "./pages/client/ChallengesList/ChallengesList";
import { CodingExercise } from "./pages/client/CodingExercise/CodingExercise";
import { AdminCreateClass } from "./pages/admin/AdminCreateClass/AdminCreateClass";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.context";

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);
  function protectedRouter() {
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  }

  function rejectedRouter() {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />;
  }

  function adminRouter() {
    return user.role === "ADMIN" ? <Outlet /> : <Navigate to="/dashboard" />;
  }

  function teacherRouter() {
    return user.role === "TEACHER" ? <Outlet /> : <Navigate to="/dashboard" />;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={rejectedRouter()}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route path="/signup" element={<SignUpForm />} />
        <Route element={protectedRouter()}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/classes/:classSlug" element={<ClassroomDetail />} />
          <Route
            path="/challenges/:challengeSlug"
            element={<CodingChallengeDetail />}
          />
          <Route path="/challenges" element={<ChallengesList />} />
          <Route
            path="/classes/:classSlug/exercises/:exerciseId"
            element={<CodingExercise />}
          />
          <Route
            path="classes/:classSlug/grading"
            element={<AdminGradingPage />}
          />
          {/* Teacher routes */}
          <Route element={teacherRouter()}>
            <Route path="create-exercise" element={<AdminCreateExercise />} />
          </Route>

          {/* Admin routes */}
          <Route element={adminRouter()}>
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="classes" element={<AdminClassroom />} />
              <Route
                path="create-challenge"
                element={<AdminCreateChallenge />}
              />
              <Route path="create-class" element={<AdminCreateClass />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
