import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X, Save, Plus, Loader2 } from "lucide-react";

const API = "https://blog-prai.vercel.app/api/blogs";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    image: "",
  });

  // Get all blogs
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

  // Handle input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Edit blog
  function handleEdit(blog) {
    setEditingBlog(blog._id);

    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      content: blog.content || "",
      author: blog.author || "",
      image: blog.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Update blog
  async function handleUpdate(e) {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");

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

      setFormData({
        title: "",
        description: "",
        content: "",
        author: "",
        image: "",
      });

      await fetchBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  // Cancel editing
  function handleCancel() {
    setEditingBlog(null);

    setFormData({
      title: "",
      description: "",
      content: "",
      author: "",
      image: "",
    });
  }

  // Delete blog
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete blog");
      }

      alert("Blog deleted successfully!");

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

      if (editingBlog === id) {
        handleCancel();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#090D18] p-4 text-white sm:p-6 ">
      {/* Heading */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm tracking-widest text-blue-400">
            ADMIN DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Manage Blogs</h1>

          <p className="mt-2 text-sm text-gray-400">
            Edit, update and delete your published blogs.
          </p>
        </div>

        <Link
          to="/add-blog"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Blog
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Edit Form */}
      {editingBlog && (
        <form
          onSubmit={handleUpdate}
          className="mb-10 space-y-5 rounded-2xl border border-blue-500/30 bg-[#131B2D] p-5 sm:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Edit Blog</h2>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              aria-label="Cancel editing"
            >
              <X size={22} />
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#090D18] p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#090D18] p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Author</label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#090D18] p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Content</label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="7"
              className="w-full rounded-xl border border-white/10 bg-[#090D18] p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Current Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full rounded-xl border border-white/10 bg-[#090D18] p-3 outline-none focus:border-blue-500"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Blog preview"
                className="mt-4 h-40 w-56 rounded-xl object-cover"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
            >
              {updating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}

              {updating ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-gray-300 hover:bg-white/10"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-16 text-center text-gray-400">
          <Loader2 className="mx-auto mb-3 animate-spin" size={30} />
          Loading blogs...
        </div>
      )}

      {/* Blog List */}
      {!loading && blogs.length === 0 && !error && (
        <div className="rounded-2xl border border-white/10 bg-[#131B2D] p-10 text-center">
          <h2 className="text-xl font-semibold">No blogs yet</h2>

          <p className="mt-2 text-sm text-gray-400">
            Create your first blog to manage it here.
          </p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Total Blogs: {blogs.length}</p>

          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#131B2D] p-4 transition hover:border-blue-500/30 sm:flex-row sm:items-center sm:p-5"
            >
              {/* Image */}
              <div className="h-44 w-full shrink-0 overflow-hidden rounded-xl bg-[#090D18] sm:h-28 sm:w-36">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold">{blog.title}</h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {blog.description}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  By {blog.author || "Anonymous"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-400 transition hover:bg-blue-500/20"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/20"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
