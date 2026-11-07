import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User, Calendar } from "lucide-react";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blog-bebv.vercel.app/api/blogs");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="ml-[270px] min-h-screen bg-[#090D18] p-8 text-white">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-400">DISCOVER STORIES</p>

        <h1 className="mt-2 text-4xl font-bold">All Blogs</h1>

        <p className="mt-3 text-gray-400">
          Explore all the latest stories and ideas.
        </p>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading blogs...</p>}

      {/* Error */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Empty */}
      {!loading && !error && blogs.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#131B2D] p-10 text-center">
          <h2 className="text-xl font-semibold">No blogs yet!</h2>

          <p className="mt-2 text-gray-400">Be the first to publish a blog.</p>

          <Link
            to="/add-blog"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
          >
            Add Your First Blog
          </Link>
        </div>
      )}

      {/* Blog Cards */}
      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#131B2D] transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
            >
              <img
                src={
                  blog.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                }
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{blog.title}</h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                  {blog.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <User size={15} />
                    {blog.author}
                  </span>

                  <span className="flex items-center gap-2">
                    <Calendar size={15} />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  to={`/blogs/${blog._id}`}
                  className="mt-6 flex items-center gap-2 font-semibold text-blue-400 hover:text-purple-400"
                >
                  Read More <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
