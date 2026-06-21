import { useCallback } from "react";
import BlogCard, { type Blog } from "./BlogCard";

interface BlogListProps {
  blogs: Blog[];
  title?: string;
  onDelete?: (id: any) => void;
  onEdit?: (blog: Blog) => void;
}

function BlogListItem({ blog, onDelete, onEdit }: { blog: Blog; onDelete?: (id: any) => void; onEdit?: (blog: Blog) => void }) {
  const handleEdit = useCallback(() => onEdit?.(blog), [onEdit, blog]);
  return <BlogCard key={blog.id} blog={blog} onDelete={onDelete} onEdit={handleEdit} />;
}

const BlogList = ({ blogs, title, onDelete, onEdit }: BlogListProps) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-3xl">
        <p className="text-gray-500">No blogs to display here.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;