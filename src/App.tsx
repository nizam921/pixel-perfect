import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GurManiaPage from "./pages/GurMania.tsx";
import GurManiaCatalog from "./pages/GurManiaCatalog.tsx";
import GurManiaProduct from "./pages/GurManiaProduct.tsx";
import InnVinoPage from "./pages/InnVino.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gurmania" element={<GurManiaPage />} />
          <Route path="/gurmania/catalog" element={<GurManiaCatalog />} />
          <Route path="/gurmania/product/:id" element={<GurManiaProduct />} />
          <Route path="/innvino" element={<InnVinoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
