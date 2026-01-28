import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import puter from "@heyputer/puter.js";

export default function EditPage() {
    const { id } = useParams(); // This will be the DB ID or the Puter FileName
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // 1. Determine if this is a Cloud file or Local DB item
    const isCloud = id?.endsWith('.json');

    useEffect(() => {
        const loadData = async () => {
            try {
                if (isCloud) {
                    // Fetch from Puter
                    const data = await puter.fs.read(`Documents/merchandise/${id}`);
                    const text = typeof data === 'string' ? data : await data.text();
                    const parsed = JSON.parse(text);
                    setTitle(parsed.title);
                    setBody(parsed.body);
                    setAuthor(parsed.author);
                } else {
                    // Fetch from Local JSON Server
                    const res = await fetch(`http://localhost:8000/blogs/${id}`);
                    const data = await res.json();
                    setTitle(data.title);
                    setBody(data.body);
                    setAuthor(data.author);
                }
            } catch (err) {
                console.error("Failed to load:", err);
            } finally {
                setIsPending(false);
            }
        };
        loadData();
    }, [id, isCloud]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        const updatedItem = { title, body, author, id };

        try {
            if (isCloud) {
                // Update Puter
                await puter.fs.write(`Documents/merchandise/${id}`, JSON.stringify(updatedItem));
            } else {
                // Update Local JSON Server
                await fetch(`http://localhost:8000/blogs/${id}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedItem)
                });
            }
            navigate('/profile');
        } catch (err) {
            alert("Update failed!");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) return (
        <div className="min-h-screen bg-[#04071d] flex items-center justify-center">
            <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#04071d] text-white p-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Profile
                </button>

                <h2 className="text-3xl font-bold mb-8 text-orange-500">
                    Edit {isCloud ? "Cloud Merchandise" : "Local Blog"}
                </h2>

                <form onSubmit={handleUpdate} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                        <input 
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-colors"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
                        <input 
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-colors"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                        <textarea 
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-orange-500 transition-colors h-48 resize-none"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        disabled={isUpdating}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}