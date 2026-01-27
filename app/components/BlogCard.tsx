import { FileText, User, Trash2 } from "lucide-react";
import { type Blog } from "./BlogList";

interface BlogCardProps {
  blog: Blog & { puterFileName?: string }; // Include the filename for cloud items
  onDelete?: (fileName: string) => void;
}

const BlogCard = ({ blog, onDelete }: BlogCardProps) => {
  return (
    <div className="relative bg-[#0c0e23] border border-white/10 p-6 rounded-3xl flex flex-col justify-between hover:border-orange-500/50 transition-all group">
      {/* Delete Button - Only shows if onDelete is provided and it's a cloud file */}
      {onDelete && blog.puterFileName && (
        <button 
          onClick={() => onDelete(blog.puterFileName!)}
          className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-10"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div>
        <FileText className="text-orange-500 mb-4" size={24} />
        <h2 className="text-xl font-bold mb-1 text-white">{blog.title}</h2>
        <p className="text-gray-500 text-xs italic mb-4">By {blog.author}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{blog.body}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono flex justify-between">
        <span>ID: {blog.id}</span>
        <span className="text-orange-500/50 uppercase">{blog.puterFileName ? 'Cloud' : 'Local'}</span>
      </div>
    </div>
  );
};

export default BlogCard;