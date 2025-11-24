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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Bell, Globe } from "lucide-react";

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
              <header className="sticky top-4 z-50 mx-6 mt-6 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg px-6 h-16 flex items-center justify-between transition-all duration-300 hover:bg-white/10">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-foreground/80 hover:text-foreground transition-colors" />
                  <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />
                  <div className="flex items-center gap-2">
                     <Switch className="data-[state=checked]:bg-teal-500" />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="rounded-full bg-white/5 hover:bg-white/10 text-foreground/80 border border-white/5 hidden sm:flex">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>EN</span>
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-foreground/80 border border-white/5">
                    <Search className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-foreground/80 border border-white/5 relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                  </Button>

                  <div className="pl-2 border-l border-white/10 ml-2">
                    <Avatar className="h-9 w-9 border-2 border-white/10 cursor-pointer hover:scale-105 transition-transform">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </header>
              <main className="flex-1 px-6 pb-6 relative">
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
