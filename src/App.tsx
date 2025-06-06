
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Public Pages
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import BlogPage from "./pages/BlogPage";
import GitHubPage from "./pages/GitHubPage";
import ProjectsPage from "./pages/ProjectsPage";
import ConnectPage from "./pages/ConnectPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResumePage from "./pages/ResumePage";

// Admin Pages
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditHero from "./pages/admin/EditHero";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageExperience from "./pages/admin/ManageExperience";
import ManageProjects from "./pages/admin/ManageProjects";
import ContactMessages from "./pages/admin/ContactMessages";

// Not Found Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/github" element={<GitHubPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/resume" element={<ResumePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="hero" element={<EditHero />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="messages" element={<ContactMessages />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
