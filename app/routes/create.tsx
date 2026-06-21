import { useState } from "react";
import { useNavigate } from "react-router"; // Updated for React Router v6
import { Send, ArrowLeft } from "lucide-react";

const Create = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');
    const [isPending, setIsPending] = useState<boolean>(false);

    const navigate = useNavigate(); // v6 replacement for useHistory

    // Type the event as React.FormEvent
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            navigate('/profile');
        }).catch(err => {
            console.error('Failed to add blog:', err);
            setIsPending(false);
        });
    }

    return (

        <div className="create max-w-md mx-auto text-center mt-10 text-white">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2">
                <ArrowLeft size={18} /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Add a New Blog</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div>
                    <label className="block mb-2">Blog title:</label>
                    <input
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-500 outline-none"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2">Blog body:</label>
                    <textarea
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-500 outline-none h-32"
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-2">Blog author:</label>
                    <select
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 outline-none"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    >
                        <option value="mario">mario</option>
                        <option value="yoshi">yoshi</option>
                    </select>
                </div>

                <button
                    disabled={isPending}
                    className="bg-orange-600 hover:bg-orange-500 py-2 rounded font-bold mt-4 transition-colors disabled:bg-gray-600"
                >
                    {isPending ? 'Adding Blog...' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
}

export default Create;