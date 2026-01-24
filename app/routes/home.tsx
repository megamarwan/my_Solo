import { useState, useEffect, lazy, Suspense } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { Info, UserCircle, MessageSquare, ArrowRight } from "lucide-react";

// Aceternity-style Spotlight component (or your local import)
import { Spotlight } from "C:/Users/pc/Desktop/my_Solo/app/components/ui/spotlight";

const Globe = lazy(() => import("../components/Globe"));

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Biznas Libya | Global Shopping" },
    { name: "description", content: "Bringing global commerce to Tripoli, Libya." },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    {
      title: "Our Mission",
      description: "Bridging the gap between global brands and the Libyan market.",
      path: "/about",
      icon: <Info className="text-orange-500" size={24} />,
    },
    {
      title: "Join Us",
      description: "Create an account to browse thousands of verified products.",
      path: "/authentication",
      icon: <UserCircle className="text-orange-500" size={24} />,
    },
    {
      title: "Contact Us",
      description: "Visit our office in Bin Ashour or reach out online.",
      path: "/contact",
      icon: <MessageSquare className="text-orange-500" size={24} />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030617] flex items-center justify-center overflow-hidden antialiased">
      {/* 1. Cinematic Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 max-w-5xl w-full px-6 py-12">
        {/* 2. Enhanced Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Biznas <span className="text-orange-500">Libya</span>
          </h1>
          <p className="mt-4 text-neutral-400 max-w-lg mx-auto text-lg">
            The future of shopping in Tripoli. High-end merchandise, 
            delivered with global standards.
          </p>
        </div>

        {/* 3. Bento Grid with Interactive Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="group relative p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e23]/50 backdrop-blur-sm hover:bg-[#161a31] transition-all duration-500 text-left flex flex-col justify-between h-56 overflow-hidden"
            >
              {/* Internal card glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div>
                <div className="mb-4 p-2 bg-orange-500/10 border border-orange-500/20 w-fit rounded-lg shadow-inner">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold text-neutral-200">{item.title}</h2>
                <p className="text-sm text-neutral-500 mt-2 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs uppercase tracking-widest mt-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                Enter <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* 4. Globe Section with better framing */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          {/* Subtle radial glow behind the globe */}
          <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          {isClient && (
            <Suspense fallback={<div className="w-64 h-64 border-2 border-orange-500/20 rounded-full animate-ping" />}>
              <div className="w-full h-full scale-110 md:scale-125">
                <Globe />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}