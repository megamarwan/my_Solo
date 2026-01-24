import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import puter from "@heyputer/puter.js";
import { Plus, FileText, User, Loader2, RefreshCw } from "lucide-react";

export default function Profile() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      await puter.fs.mkdir('merchandise').catch(() => null);
      const files = await puter.fs.readdir('merchandise');
      
      const fileContents = await Promise.all(
        files
          .filter((file: any) => file.name.endsWith('.json'))
          .map(async (file: any) => {
            const data = await puter.fs.read(`merchandise/${file.name}`);
            // Puter sometimes returns a Blob; we ensure it's a string
            const text = typeof data === 'string' ? data : await data.text();
            return JSON.parse(text);
          })
      );

      setItems(fileContents);
    } catch (err) {
      console.error("Error fetching from Puter:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-[#04071d] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500 rounded-2xl">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Merchandise</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm">Tripoli Biznas Cloud</p>
                <button onClick={fetchFiles} className="text-orange-500 hover:rotate-180 transition-transform duration-500">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/productUpload')}
            className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={20} /> Add New Object
          </button>
        </div>

        {/* Display List */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={48} /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 text-lg">No items found. Check your folder in Puter.com!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-[#0c0e23] border border-white/10 p-6 rounded-3xl flex flex-col justify-between hover:border-orange-500/50 transition-colors">
                <div>
                  <FileText className="text-orange-500 mb-4" size={24} />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono flex justify-between">
                  <span>ID: {item.id}</span>
                  <span className="text-orange-500/50 uppercase">Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}