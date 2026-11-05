import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

export default function AddBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add blog.");
      }

      alert("Blog added successfully!");
      navigate("/blogs");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#151C2E] px-4 py-3 text-white outline-none focus:border-blue-500";

  return (
    <main className="ml-[270px] min-h-screen p-8 text-white">
      <button
        onClick={() => navigate("/blogs")}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={18} /> Back to blogs
      </button>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Create a New Blog</h1>
        <p className="mt-2 mb-8 text-gray-400">
          Share your ideas and stories with the world.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-[#101525] p-8"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Blog Title
            </label>
            <input
              className={inputClass}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Short Description
            </label>
            <textarea
              className={inputClass}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Blog Content
            </label>
            <textarea
              className={inputClass}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog..."
              rows="8"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Author</label>
            <input
              className={inputClass}
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Image URL
            </label>
            <input
              className={inputClass}
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste an image URL"
            />
          </div>

          {message && <p className="text-sm text-red-400">{message}</p>}

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            <Send size={18} /> Publish Blog
          </button>
        </form>
      </div>
    </main>
  );
}
