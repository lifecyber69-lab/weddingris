import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ribbon from "@/components/Ribbon";
import Invitation from "@/components/Invitation";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import RsvpWishes from "@/components/RsvpWishes";
import Footer from "@/components/Footer";

function App() {
  return (
    <SmoothScroll>
      <div className="App bg-ivory text-ink font-body antialiased">
        <Nav />
        <main>
          <Hero />
          <Ribbon />
          <Invitation />
          <Countdown />
          <Events />
          <RsvpWishes />
        </main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#FDFBF7",
              color: "#2D1B1B",
              border: "1px solid rgba(212,175,55,0.5)",
              fontFamily: "Outfit, sans-serif",
            },
          }}
        />
      </div>
    </SmoothScroll>
  );
}

export default App;
