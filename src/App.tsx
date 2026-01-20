import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentSignup from "./pages/StudentSignup";
import TeacherOnboarding from "./pages/onboarding/TeacherOnboarding";
import StudentOnboarding from "./pages/onboarding/StudentOnboarding";
import Search from "./pages/Search";
import TeacherProfile from "./pages/TeacherProfile";
import Messages from "./pages/Messages";
import Sessions from "./pages/Sessions";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

// Composant pour gérer la redirection automatique vers le bon dashboard
const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Rediriger vers le dashboard approprié selon le rôle
  if (user?.role === 'teacher') {
    return <Navigate to="/teacher-dashboard" replace />;
  }

  if (user?.role === 'student') {
    return <Navigate to="/student-dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/onboarding/teacher" element={<TeacherOnboarding />} />
            <Route path="/onboarding/student" element={<StudentOnboarding />} />
            <Route path="/search" element={<Search />} />
            <Route path="/teacher/:id" element={<TeacherProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            {/* Route générique pour rediriger vers le bon dashboard */}
            <Route path="/home" element={<DashboardRouter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
