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
      <BrowserRouter basename="/dy-2k25">
        <Routes>
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                      path="/event-registration/:id"
                      element={<EventRegistration />}
                    />
                    <Route
                      path="/event-registration"
                      element={<EventRegistration />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
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
  9: "https://link.dakshayanthra.in/OneMicStand",
  10: "https://link.dakshayanthra.in/JAM",
  11: "https://link.dakshayanthra.in/CA",
  12: "https://docs.google.com/forms/d/e/1FAIpQLScCsE4Be3pRHsA62oLnlmXf9xpuvalZe0AdFOIjYii31d5riA/viewform?usp=dialog#BGMITournament",
  13: "https://docs.google.com/forms/d/e/1FAIpQLSedvBzR7NXWCwOaa5P3cpWw-HKoW_G85lrm7aBspJeaKOiZ9g/viewform?usp=dialog",
  14: "https://docs.google.com/forms/d/e/1FAIpQLSdWPALiPTVn0Nj-xhKEK11V1GbC20HtYo26tKv7rUwxfAyvnw/viewform?usp=header",
  15: "https://docs.google.com/forms/d/e/1FAIpQLSfhYGwsRkw1T2vzNf6AM_GOnA1rPh02ReCj8thTqWRPX5eO-w/viewform?usp=header",
  16: "https://link.dakshayanthra.in/Cinema",
  17: "https://link.dakshayanthra.in/BlindCode",
  18: "https://link.dakshayanthra.in/CircuitDebugg",
  19: "https://link.dakshayanthra.in/CodeClash",
  20: "https://link.dakshayanthra.in/ArtGallery",
  21: "https://link.dakshayanthra.in/DataScience",
  22: "https://link.dakshayanthra.in/TechTalkBattle",
  23: "https://link.dakshayanthra.in/FOSSathon",
  24: "https://link.dakshayanthra.in/Impressario",
  25: "https://link.dakshayanthra.in/ArtGallery",
  26: "https://link.dakshayanthra.in/ArtGallery",
  27: "https://link.dakshayanthra.in/PublicSpeaking",
  28: "https://link.dakshayanthra.in/RJHUNT",
  29: "https://link.dakshayanthra.in/SignLanguageWorkshop",
  30: "https://link.dakshayanthra.in/TechQuiz",
  31: "https://link.dakshayanthra.in/ArtGallery",
  32: "https://link.dakshayanthra.in/TypeRace",
  33: "https://link.dakshayanthra.in/ArtGallery",
  34: "https://link.dakshayanthra.in/WebDev",
  35: "https://link.dakshayanthra.in/WebDevWorkshop",
};