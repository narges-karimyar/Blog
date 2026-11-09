import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, Send, Loader2, ImagePlus, X, Menu } from "lucide-react";

const API_URL = "https://blog-prai.vercel.app/api/blogs";

export default function AddBlog() {
  const navigate = useNavigate();
  const outlet = useOutletContext();
  const setOpen = outlet?.setOpen;

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

  // Handle inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle image
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

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  // Remove image
  function removeImage() {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview("");
  }

  // Submit blog
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    "w-full rounded-xl border border-white/10 bg-[#151C2E] px-4 py-3 text-sm sm:text-base text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <main className="ml-0 min-h-screen bg-[#090D18] px-4 pb-10 pt-5 text-white sm:px-6 sm:pt-8 ">
      {/* Top navigation */}
      <div className="mb-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to blogs
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen?.((prev) => !prev)}
          className="rounded-xl border border-white/10 bg-[#151C2E] p-3 text-white transition hover:bg-blue-600 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={21} />
        </button>
      </div>

      {/* Page content */}
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-7 sm:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Create content
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">Create a New Blog</h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Share your ideas and stories with the world.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-[#101525] p-4 shadow-xl sm:p-6 md:p-8"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
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

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Short Description
            </label>

            <textarea
              className={inputClass}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Blog Content
            </label>

            <textarea
              className={`${inputClass} resize-y`}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog..."
              rows={9}
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Author
            </label>

            <input
              className={inputClass}
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Blog Cover Image
            </label>

            {preview ? (
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={preview}
                  alt="Blog preview"
                  className="h-48 w-full object-cover sm:h-64"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
                  aria-label="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#151C2E] px-4 py-10 text-center transition hover:border-blue-500">
                <ImagePlus size={36} className="mb-3 text-blue-400" />

                <span className="text-sm font-medium sm:text-base">
                  Click to upload an image
                </span>

                <span className="mt-2 text-xs text-gray-500 sm:text-sm">
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

          {/* Error */}
          {message && (
            <p className="break-words rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {message}
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
        </form>
      </div>
    </main>
  );
}
