import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, LogOut, User, LayoutDashboard } from "lucide-react";
import puter from "@heyputer/puter.js"; 

export default function PuterAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Added {} to satisfy Puter's TS requirements as discussed
      if (puter.auth.isSignedIn()) {
        const userInfo = await puter.auth.getUser({});
        setUser(userInfo);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // 2. NEW: Redirect watch - If user exists, go to profile
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      const res = await puter.auth.signIn();
      setUser(res); // This will trigger the useEffect redirect above
    } catch (err) {
      console.error("Auth failed:", err);
    }
  };

  const handleSignOut = () => {
    puter.auth.signOut();
    setUser(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#04071d] flex items-center justify-center text-orange-500">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#04071d] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0c0e23] border border-white/10 rounded-[2rem] p-10 text-center shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-600/20 rounded-full blur-[80px]"></div>

        <div className="space-y-6 relative z-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">Secure Access</h1>
          <p className="text-gray-400">
            Sign in with Puter to manage your merchandise and cloud storage in Libya.
          </p>
          
          <button 
            onClick={handleSignIn}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg mt-4 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
          >
            Continue with Puter
          </button>
          
          <p className="text-xs text-gray-500 mt-6">
            Powered by Puter.js — No backend required.
          </p>
        </div>
      </div>
    </div>
  );
}