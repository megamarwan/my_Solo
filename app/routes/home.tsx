import { useState, useEffect, lazy, Suspense } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { Info, UserCircle, MessageSquare, ArrowRight, User } from "lucide-react";
import puter from "@heyputer/puter.js";

import { Spotlight } from "C:/Users/pc/Desktop/my_Solo/app/components/ui/spotlight";

const Globe = lazy(() => import("../components/Globe"));

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Biznas | Start here" },
    { name: "description", content: "Manage your cloud merchandise and local blogs." },
  ];
}

const navItems = [
  {
    title: "Our Mission",
    description: "Bridging the gap between global brands and the Libyan market.",
    path: "/about",
    icon: <Info className="text-orange-500" size={18} />,
  },
  {
    title: "Contact Us",
    description: "Visit our office in Bin Ashour or reach out online.",
    path: "/contact",
    icon: <MessageSquare className="text-orange-500" size={18} />,
  },
];

function useAuthState() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsAuthenticated(puter.auth.isSignedIn());
  }, []);

  return { isClient, isAuthenticated };
}

export default function Home() {
  const navigate = useNavigate();
  const { isClient, isAuthenticated } = useAuthState();

  const items = isAuthenticated
    ? [
        navItems[0],
        {
          title: "My Profile",
          description: "Access your dashboard and manage your merchandise.",
          path: "/profile",
          icon: <User className="text-orange-500" size={18} />,
        },
        navItems[1],
      ]
    : [
        navItems[0],
        {
          title: "Login or Sign up",
          description: "Login or Create an account to browse products.",
          path: "/authentication",
          icon: <UserCircle className="text-orange-500" size={18} />,
        },
        navItems[1],
      ];

  return (
    // justify-start + pt-4 ensures the title stays at the top
    <div className="relative h-screen w-full bg-[#010411] flex flex-col items-center justify-start overflow-hidden antialiased p-4 pt-8">
      <Spotlight className="-top-40 left-0 md:left-60" fill="white" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Header - Reduced margin-bottom */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Biznas <span className="text-orange-500">Libya</span>
          </h1>
          <p className="mt-1 text-neutral-400 max-w-sm mx-auto text-xs md:text-sm leading-tight">
            High-end merchandise, delivered with global standards in Tripoli.
          </p>
        </div>

        {/* Navigation Cards - Shorter height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-4">
          {items.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="group relative p-4 rounded-xl border border-white/[0.08] bg-[#0c0e23]/50 backdrop-blur-sm hover:bg-[#161a31] transition-all duration-500 text-left flex flex-col justify-between h-36 overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="mb-2 p-1 bg-orange-500/10 border border-orange-500/20 w-fit rounded-md">
                  {item.icon}
                </div>
                <h2 className="text-sm md:text-base font-bold text-neutral-200">{item.title}</h2>
                <p className="text-[10px] text-neutral-500 mt-1 leading-tight line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-orange-500 font-semibold text-[9px] uppercase tracking-widest mt-2 group-hover:translate-x-1 transition-all">
                Enter <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>

        {/* Globe Container - Height reduced and pulled up slightly */}
        <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center -mt-2">
          <div className="absolute w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

          <Spotlight className="top-1/2 left-1/2 w-[200%] h-[200%]" fill="white" />

          {isClient && (
            <Suspense fallback={<div className="w-12 h-12 border-2 border-orange-300/20 rounded-full animate-ping" />}>
              {/* Lower scale ensures the whole globe is visible */}
              <div className="w-full h-full scale-[0.85] md:scale-100">
                <Globe />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}