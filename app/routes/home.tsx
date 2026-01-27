import { useState, useEffect, lazy, Suspense } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { Info, UserCircle, MessageSquare, ArrowRight, User } from "lucide-react";
import puter from "@heyputer/puter.js"; // Import puter

// Aceternity-style Spotlight component
import { Spotlight } from "C:/Users/pc/Desktop/my_Solo/app/components/ui/spotlight";

const Globe = lazy(() => import("../components/Globe"));
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Biznas | Start here" },
    { name: "description", content: "Manage your cloud merchandise and local blogs." },
  ];
}

export default function Home() {


  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    setIsClient(true);
    // Check if user is logged into Puter
    setIsAuthenticated(puter.auth.isSignedIn());
  }, []);

  // Define navItems inside the component so they can react to isAuthenticated
  const navItems = [
    {
      title: "Our Mission",
      description: "Bridging the gap between global brands and the Libyan market.",
      path: "/about",
      icon: <Info className="text-orange-500" size={24} />,
    },
    {
      // DYNAMIC ITEM: Shows "My Profile" if logged in, otherwise "Join Us"
      title: isAuthenticated ? "My Profile" : "Login or Sign up",
      description: isAuthenticated
        ? "Access your dashboard and manage your merchandise."
        : "Login or Create an account to browse thousands of verified products.",
      path: isAuthenticated ? "/profile" : "/authentication",
      icon: isAuthenticated
        ? <User className="text-orange-500" size={24} />
        : <UserCircle className="text-orange-500" size={24} />,
    },
    {
      title: "Contact Us",
      description: "Visit our office in Bin Ashour or reach out online.",
      path: "/contact",
      icon: <MessageSquare className="text-orange-500" size={24} />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#010411] flex items-center justify-center overflow-hidden antialiased">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 max-w-5xl w-full px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Biznas <span className="text-orange-500">Libya</span>
          </h1>
          <p className="mt-4 text-neutral-400 max-w-lg mx-auto text-lg">
            The future of shopping in Tripoli. High-end merchandise,
            delivered with global standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="group relative p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e23]/50 backdrop-blur-sm hover:bg-[#161a31] transition-all duration-500 text-left flex flex-col justify-between h-56 overflow-hidden"
            >
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
                {isAuthenticated && idx === 1 ? "View Dashboard" : "Enter"} <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        <div className="relative w-full h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

          {isClient && (
            <Suspense fallback={<div className="w-64 h-64 border-2 border-orange-300/20 rounded-full animate-ping" />}>
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