import { MapPin, Target, Mail, ArrowRight, Globe2, Building2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Biznas | Our Mission" },
    { name: "description", content: "Bridging the gap between global brands and the Libyan market." },
  ];
}

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#04071d] font-sans text-white overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase mb-6">
            <Globe2 size={14} /> Our Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Global Goods, <span className="text-orange-500">Local Access.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are bridging the gap between global brands and the Libyan market, 
            starting from the heart of Tripoli.
          </p>
        </div>
      </section>

      {/* 2. Mission & Location Grid */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="group p-8 rounded-[2.5rem] bg-[#0c0e23] border border-white/5 hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-8 text-orange-500">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our core purpose is to bring high-quality merchandise to Libya. 
              We believe that every Libyan deserves access to the best products 
              the world has to offer without international shipping barriers.
            </p>
          </div>

          <div className="group p-8 rounded-[2.5rem] bg-[#0c0e23] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
              <MapPin size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Our Location</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Visit our headquarters in the business hub of the capital to explore our collection or discuss corporate partnerships.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <Building2 size={20} className="text-orange-500" />
              <p className="text-white font-medium text-sm">Bin Ashour, Tripoli, Libya</p>
            </div>
          </div>
      </section>

      {/* 3. REWRITTEN CTA: Toned down and Darkened */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative group p-1 md:p-[2px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-white/10 via-orange-500/20 to-white/10">
            {/* The actual inner content (Dark Glass) */}
            <div className="bg-[#0c0e23] rounded-[3rem] p-10 md:p-20 text-center relative z-10">
              
              {/* Subtle Ambient Glow inside */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] pointer-events-none" />

              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-tighter">
                <ShieldCheck size={14} /> Official Partnership
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Ready to partner with <span className="text-orange-500">us?</span>
              </h2>
              
              <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
                Whether you are a global supplier or a local merchant, we are ready to scale your business in Libya.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => navigate('/contact')}
                  className="group relative inline-flex items-center gap-3 bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-500 transition-all shadow-[0_10px_30px_rgba(234,88,12,0.2)]"
                >
                  <Mail size={22} />
                  Contact Us
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-500 hover:text-white font-bold transition-colors flex items-center gap-2"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="py-12 text-center text-gray-600 text-xs font-bold tracking-[0.2em] uppercase">
        <div className="w-24 h-[1px] bg-orange-500/30 mx-auto mb-8" />
        © 2026 BIZNAS LIBYA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

export default AboutPage;