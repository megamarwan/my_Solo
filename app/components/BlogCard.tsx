import { FileText, User, Trash2, Edit3 } from "lucide-react";

export interface Blog {
  id: number | string;
  title: string;
  body: string;
  author: string;
  puterFileName?: string;
}

interface BlogCardProps {
  blog: Blog;
  onDelete?: (id: any) => void;
  onEdit?: () => void; // Defined as an optional function
}

const BlogCard = ({ blog, onDelete, onEdit }: BlogCardProps) => {
  return (
    <div className="relative bg-[#0c0e23] border border-white/10 p-6 rounded-3xl flex flex-col justify-between hover:border-orange-500/50 transition-all group overflow-hidden h-full">

      {/* DELETE BUTTON */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const targetId = blog.puterFileName || blog.id;
            onDelete(targetId);
          }}
          className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20"
          title={blog.puterFileName ? "Delete from Cloud" : "Delete from Local DB"}
        >
          <Trash2 size={18} />
        </button>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <FileText className="text-orange-500" size={24} />
        </div>

        <h2 className="text-xl font-bold mb-1 text-white group-hover:text-orange-500 transition-colors line-clamp-2">
          {blog.title}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <User size={12} className="text-gray-500" />
          <p className="text-gray-500 text-xs italic">By {blog.author}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {blog.body}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
        {/* Visual source indicator */}
        <span className="text-[9px] uppercase tracking-widest text-gray-600 font-bold px-2 py-1 bg-white/5 rounded-md">
          {blog.puterFileName ? "Cloud Storage" : "Local DB"}
        </span>

        {/* EDIT BUTTON */}
        <button
  onClick={(e) => {
    e.stopPropagation();
    if (onEdit) onEdit(); // No arguments here, BlogList handles the argument
  }}
>
  Edit Details
</button>
      </div>
    </div>
  );
};

export default BlogCard;