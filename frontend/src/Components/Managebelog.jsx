import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X, Save, Plus } from "lucide-react";

const API = "https://blog-bebv.vercel.app/";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    image: "",
  });

  async function fetchBlogs() {
    try {
      setLoading(true);
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Could not load blogs");
      }

      const data = await response.json();
      setBlogs(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  function handleEdit(blog) {
    setEditingBlog(blog._id);

    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      content: blog.content || "",
      author: blog.author || "",
      image: blog.image || "",
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/${editingBlog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update blog");
      }

      alert("Blog updated successfully!");
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete blog");
      }

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== id),
      );

      alert("Blog deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-[#151C2E] p-3 text-white outline-none focus:border-blue-500";

  return (
    <main className="ml-[270px] min-h-screen bg-[#090D18] p-8 text-white">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
          <p className="mt-2 text-gray-400">
            Edit, update, and delete your blog posts.
          </p>
        </div>

        <Link
          to="/add-blog"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} /> Add New Blog
        </Link>
      </div>

      {error && (
        <p className="mb-5 rounded-xl bg-red-500/10 p-4 text-red-400">
          {error}
        </p>
      )}

      {editingBlog && (
        <form
          onSubmit={handleUpdate}
          className="mb-8 space-y-4 rounded-2xl border border-blue-500/30 bg-[#101525] p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Edit Blog</h2>

            <button
              type="button"
              onClick={() => setEditingBlog(null)}
              className="text-gray-400 hover:text-white"
            >
              <X />
            </button>
          </div>

          <input
            className={inputStyle}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />

          <textarea
            className={inputStyle}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            required
          />

          <textarea
            className={inputStyle}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            rows="6"
            required
          />

          <input
            className={inputStyle}
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />

          <input
            className={inputStyle}
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            <Save size={18} /> Save Changes
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#101525] p-10 text-center">
          <h2 className="text-xl font-semibold">No blogs yet</h2>
          <p className="mt-2 text-gray-400">
            Create your first blog to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#101525] p-5 sm:flex-row sm:items-center"
            >
              <img
                src={
                  blog.image ||
                  "https://placehold.co/120x100/151C2E/FFFFFF?text=Blog"
                }
                alt={blog.title}
                className="h-24 w-full rounded-xl object-cover sm:w-32"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold">{blog.title}</h2>

                <p className="mt-1 text-sm text-gray-400">{blog.description}</p>

                <p className="mt-2 text-xs text-blue-400">By {blog.author}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center gap-2 rounded-lg border border-blue-500/30 px-4 py-2 text-blue-400 hover:bg-blue-500/10"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
