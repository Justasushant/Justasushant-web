import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { SoundProvider } from "./contexts/sound-context";
import SoundToggle from "./components/sound-toggle";
import Home from "./pages/home";
import Work from "./pages/work";
import About from "./pages/about";
import Contact from "./pages/contact";
import ProjectDetail from "./pages/project-detail";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/work" component={Work} />
      <Route path="/work/:projectName" component={ProjectDetail} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <SoundToggle />
        </TooltipProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
}

export default App;