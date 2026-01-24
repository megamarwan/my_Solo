
import { useState } from "react";
import { useNavigate } from "react-router";
import puter from "@heyputer/puter.js";
import { Send, ArrowLeft } from "lucide-react";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsUploading(true);

  const id = Date.now().toString();
  const newObject = { id, title, body };

  try {
    // 1. Create the directory first. 
    // We use .catch(() => null) so if it already exists, it doesn't crash.
    await puter.fs.mkdir('merchandise').catch(() => null);

    // 2. Write the file
    // IMPORTANT: Make sure the path starts exactly with 'merchandise/'
    await puter.fs.write(`merchandise/item_${id}.json`, JSON.stringify(newObject));
    
    console.log("Successfully saved to Puter!");
    navigate('/profile');
  } catch (err: any) {
    console.error("Puter Error:", err);
    // This will alert you if it's a permission or path issue
    alert(`Upload failed: ${err.message || 'Check console'}`);
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#04071d] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-[#0c0e23] border border-white/10 p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-6">Create New Object</h2>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Object Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#10132e] border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 outline-none"
                placeholder="e.g. Tripoli Laptop Stand"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description / Body</label>
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className="w-full bg-[#10132e] border border-white/10 rounded-xl py-3 px-4 focus:border-orange-500 outline-none resize-none"
                placeholder="Describe the merchandise..."
                required
              />
            </div>

            <button 
              disabled={isUploading}
              className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              {isUploading ? "Saving to Cloud..." : <><Send size={18} /> Upload to Puter</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}