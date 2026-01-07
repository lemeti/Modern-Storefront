import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Public Pages
import Home from "@/pages/Home";
import AvailablePuppies from "@/pages/AvailablePuppies";
import PuppyDetails from "@/pages/PuppyDetails";
import About from "@/pages/About";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PuppyForm from "@/pages/admin/PuppyForm";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/puppies" component={AvailablePuppies} />
      <Route path="/puppies/:id" component={PuppyDetails} />
      <Route path="/about" component={About} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/new" component={PuppyForm} />
      <Route path="/admin/edit/:id" component={PuppyForm} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
