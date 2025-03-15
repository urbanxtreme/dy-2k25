
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import EventRegistration from "./pages/EventRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/event-registration/:id" element={<EventRegistration />} />
              <Route path="/event-registration" element={<EventRegistration />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
const urlMapping = {
  1: "https://link.dakshayanthra.in/MixDY",
  2: "https://link.dakshayanthra.in/LACouture",
  3: "https://link.dakshayanthra.in/Bailamo",
  4: "https://link.dakshayanthra.in/Euphony",
  5: "https://link.dakshayanthra.in/Bloomer",
  6: "https://link.dakshayanthra.in/BeatTheSpot",
  7: "https://link.dakshayanthra.in/Groove",
  8: "https://link.dakshayanthra.in/ElDueto",
  9: "https://example.com/9",
  10: "https://example.com/10",
  11: "https://link.dakshayanthra.in/CA",
  12: "https://example.com/12",
  13: "https://docs.google.com/forms/d/e/1FAIpQLSedvBzR7NXWCwOaa5P3cpWw-HKoW_G85lrm7aBspJeaKOiZ9g/viewform?usp=dialog",
  14: "https://docs.google.com/forms/d/e/1FAIpQLSdWPALiPTVn0Nj-xhKEK11V1GbC20HtYo26tKv7rUwxfAyvnw/viewform?usp=header",
  15: "https://docs.google.com/forms/d/e/1FAIpQLSfhYGwsRkw1T2vzNf6AM_GOnA1rPh02ReCj8thTqWRPX5eO-w/viewform?usp=header",
  16: "https://example.com/16",
};
