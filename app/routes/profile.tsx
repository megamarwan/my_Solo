import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import puter from "@heyputer/puter.js";
import { Plus, User, Loader2, RefreshCw, LogOut, HomeIcon } from "lucide-react";
import BlogList from "~/components/BlogList";
import BlogCard from "~/components/BlogCard"; // Added Import
import useFetch from "~/components/useFetch";

export default function Profile() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetching from your local json-server
  const { data: blogsData, isPending: blogsLoading } = useFetch<any[]>('http://localhost:8000/blogs/');

  const fetchFiles = async () => {
    setLoading(true);
    const targetFolder = 'Documents/merchandise';
    try {
      await puter.fs.mkdir(targetFolder, { recursive: true }).catch(() => null);
      const files = await puter.fs.readdir(targetFolder);
      const fileContents = await Promise.all(
        files
          .filter((file: any) => file.name.endsWith('.json'))
          .map(async (file: any) => {
            const data = await puter.fs.read(`${targetFolder}/${file.name}`);
            const text = typeof data === 'string' ? data : await data.text();
            const parsed = JSON.parse(text);
            return {
              ...parsed,
              id: parsed.id || file.name,
              puterFileName: file.name
            };
          })
      );
      setItems(fileContents);
    } catch (err) {
      console.error("Error fetching from Puter:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await puter.auth.signOut();
      navigate('/');
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const handleDeletePuterFile = async (fileName: string) => {
    if (!window.confirm("Delete this item from the cloud?")) return;
    try {
      await puter.fs.delete(`Documents/merchandise/${fileName}`);
      setItems(prev => prev.filter(item => item.puterFileName !== fileName));
    } catch (err) {
      alert("Failed to delete file.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-[#04071d] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profile Dashboard</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm">Tripoli Biznas Cloud</p>
                <button onClick={fetchFiles} className="text-orange-500 hover:rotate-180 transition-transform duration-500">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => { navigate('/') }} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all border border-red-500/30">
              <HomeIcon  size={18} /> to home page
            </button>
          </div>
          <div className="flex gap-4">
            <button onClick={handleSignOut} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all border border-red-500/30">
              <LogOut size={18} /> Sign Out
            </button>
            <button onClick={() => navigate('/productUpload')} className="bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
              <Plus size={18} /> Add Product
            </button>
          </div>
        </header>

        {/* Global Action */}
        <button onClick={() => navigate('/create')} className="w-full mb-12 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-orange-400 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          CREATE NEW BLOG POST
        </button>

        {/* --- CLOUD SECTION --- */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
            Cloud Merchandise
          </h2>

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-orange-500" size={32} /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <BlogCard key={item.id} blog={item} onDelete={handleDeletePuterFile} />
              ))}
              {items.length === 0 && <p className="text-gray-500 italic">No cloud items found.</p>}
            </div>
          )}
        </section>

        {/* --- LOCAL SECTION --- */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Local Database Blogs
          </h2>
          {blogsData && <BlogList blogs={blogsData} />}
          {blogsLoading && <Loader2 className="animate-spin text-blue-500" />}
        </section>

      </div>
    </div>
  );
}