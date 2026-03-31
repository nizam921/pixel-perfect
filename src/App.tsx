import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GurManiaPage from "./pages/GurMania.tsx";
import GurManiaCatalog from "./pages/GurManiaCatalog.tsx";
import GurManiaProduct from "./pages/GurManiaProduct.tsx";
import GurManiaPromos from "./pages/GurManiaPromos.tsx";
import GurManiaEvents from "./pages/GurManiaEvents.tsx";
import GurManiaGallery from "./pages/GurManiaGallery.tsx";
import GurManiaAuction from "./pages/GurManiaAuction.tsx";
import GurManiaContacts from "./pages/GurManiaContacts.tsx";
import GurManiaGiftCards from "./pages/GurManiaGiftCards.tsx";
import GurManiaCheckoutSuccess from "./pages/GurManiaCheckoutSuccess.tsx";
import GurManiaSubscription from "./pages/GurManiaSubscription.tsx";
import GurManiaProfile from "./pages/GurManiaProfile.tsx";
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
          <Route path="/gurmania/promos" element={<GurManiaPromos />} />
          <Route path="/gurmania/events" element={<GurManiaEvents />} />
          <Route path="/gurmania/gallery" element={<GurManiaGallery />} />
          <Route path="/gurmania/auction" element={<GurManiaAuction />} />
          <Route path="/gurmania/contacts" element={<GurManiaContacts />} />
          <Route path="/gurmania/gift-cards" element={<GurManiaGiftCards />} />
          <Route path="/gurmania/checkout/success" element={<GurManiaCheckoutSuccess />} />
          <Route path="/gurmania/subscription" element={<GurManiaSubscription />} />
          <Route path="/gurmania/profile" element={<GurManiaProfile />} />
          <Route path="/innvino" element={<InnVinoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
