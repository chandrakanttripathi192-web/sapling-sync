import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { AppLayout } from "./components/Layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <AppLayout>{children}</AppLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/sites" element={
              <ProtectedRoute>
                <div>Sites - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/monitoring" element={
              <ProtectedRoute>
                <div>Monitoring - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <div>Reports - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/verification" element={
              <ProtectedRoute>
                <div>Verification - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <div>Users - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div>Settings - Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
