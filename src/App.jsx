import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Case from "./components/Case";
import Solutions from "./components/Solutions";
import Process from "./components/Process";
import DashboardMockup from "./components/DashboardMockup";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-ink text-mist min-h-screen font-body overflow-x-hidden">
      <Header />
      <main>
        <Hero />

        <div id="sobre">
          <Products />
        </div>

        <Case />

        <Solutions />

        <section id="beneficios" className="bg-white text-ink py-24 md:py-32 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <Process />
            <DashboardMockup />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
