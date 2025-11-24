import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ToastContainer } from "@/components/ui/toast-container";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import DeviceWizard from "./pages/DeviceWizard";
import NetworkMap from "./pages/NetworkMap";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer />
        <BrowserRouter>
          <SidebarProvider>
          <div className="min-h-screen flex w-full bg-transparent">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 flex items-center border-b border-white/20 glass px-6 sticky top-0 z-50">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold text-foreground">Radiance Network Management</h2>
                </div>
              </header>
              <main className="flex-1 p-6 relative">
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                <div className="relative z-10">
                  <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/devices" element={<DeviceWizard />} />
                  <Route path="/network-map" element={<NetworkMap />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/system-settings" element={<SystemSettings />} />
                  <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
