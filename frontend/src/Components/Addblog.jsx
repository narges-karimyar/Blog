import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2, ImagePlus, X } from "lucide-react";

const API_URL = "https://blog-prai.vercel.app/api/blogs";

export default function AddBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  function removeImage() {
    setImage(null);
    setPreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (loading) return;

    setLoading(true);

    try {
      const body = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      if (image) {
        body.append("image", image);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to publish blog.",
        );
      }

      alert("Blog published successfully!");

      navigate("/blogs");
    } catch (error) {
      console.error("Publishing error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#151C2E] px-4 py-3 text-white outline-none transition focus:border-blue-500";

  return (
    <main className="ml-[270px] min-h-screen bg-[#090D18] p-8 text-white">
      <button
        type="button"
        onClick={() => navigate("/blogs")}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to blogs
      </button>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Create a New Blog</h1>

        <p className="mb-8 mt-2 text-gray-400">
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
              rows={3}
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
              rows={8}
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

          {/* Image Upload */}

          <div>
            <label className="mb-3 block text-sm text-gray-300">
              Blog Cover Image
            </label>

            {preview ? (
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={preview}
                  alt="Blog preview"
                  className="h-64 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#151C2E] p-10 transition hover:border-blue-500">
                <ImagePlus size={36} className="mb-3 text-blue-400" />

                <span className="font-medium">Click to upload an image</span>

                <span className="mt-2 text-sm text-gray-500">
                  PNG, JPG or WEBP (Maximum 5MB)
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {message && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send size={18} />
                Publish Blog
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
