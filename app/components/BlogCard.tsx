import { FileText, User, Trash2 } from "lucide-react";

export interface Blog {
  id: number | string;
  title: string;
  body: string;
  author: string;
  // We add this as optional so it works for both Local and Cloud blogs
  puterFileName?: string; 
}

interface BlogCardProps {
  blog: Blog;
  // Adding the missing onDelete property
  onDelete?: (fileName: string) => void; 
}

const BlogCard = ({ blog, onDelete }: BlogCardProps) => {
  return (
    <div className="relative bg-[#0c0e23] border border-white/10 p-6 rounded-3xl flex flex-col justify-between hover:border-orange-500/50 transition-all group overflow-hidden">
      
      {/* 1. Delete Button: Only renders if onDelete prop exists and the blog has a file name */}
      {onDelete && blog.puterFileName && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents clicking the card when clicking delete
            onDelete(blog.puterFileName!);
          }}
          className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-10"
          title="Delete from Cloud"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <FileText className="text-orange-500" size={24} />
          {/* <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-mono">
            ID: {blog.id}
          </span> */}
        </div>
        
        <h2 className="text-xl font-bold mb-1 text-white group-hover:text-orange-500 transition-colors">
          {blog.title}
        </h2>
        
        <div className="flex items-center gap-2 mb-4">
          <User size={12} className="text-gray-500" />
          <p className="text-gray-500 text-xs italic">By {blog.author}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          {blog.body.length > 120 ? `${blog.body.substring(0, 120)}...` : blog.body}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
        {/* Visual indicator of source */}
        <span className="text-[9px] uppercase tracking-widest text-gray-600 font-bold">
          {blog.puterFileName ? "Cloud Storage" : "Local DB"}
        </span>
        
        <button className="text-xs text-orange-500 font-bold hover:underline">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;