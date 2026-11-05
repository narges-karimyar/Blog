import { Search, ArrowRight, Clock, User } from "lucide-react";

export default function Home() {
  const blogs = [
    {
      title: "The Future of Web Development",
      description:
        "Discover the latest trends and technologies shaping the future of web development.",
      category: "Technology",
      author: "Narges",
      date: "Oct 25, 2026",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    {
      title: "Learning React as a Beginner",
      description:
        "A simple guide to understanding React and building your first application.",
      category: "Education",
      author: "Narges",
      date: "Oct 22, 2026",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    },
    {
      title: "Finding Inspiration in Everyday Life",
      description:
        "Small habits and creative ideas that can make your everyday life better.",
      category: "Lifestyle",
      author: "Narges",
      date: "Oct 20, 2026",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    },
  ];

  return (
    <main className="ml-[270px] min-h-screen bg-[#090D18] p-8 text-white">
      {/* Top heading */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-400">WELCOME BACK</p>
          <h1 className="mt-2 text-3xl font-bold">
            Explore the World of Ideas
          </h1>
          <p className="mt-2 text-gray-400">
            Stories, knowledge and inspiration in one place.
          </p>
        </div>

        <button className="rounded-xl bg-white/10 p-3 hover:bg-white/20">
          <Search size={22} />
        </button>
      </div>

      {/* Hero section */}
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-10">
        <div className="relative z-10 max-w-xl">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            ✨ Discover something new
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight">
            Ideas That Inspire.
            <br />
            Stories That Matter.
          </h2>

          <p className="mt-4 text-blue-100">
            Explore interesting articles, learn new things and share your own
            stories with the world.
          </p>

          <button className="mt-7 flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105">
            Explore Blogs <ArrowRight size={18} />
          </button>
        </div>

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
      </section>

      {/* Latest blogs heading */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Latest Blogs</h2>
          <p className="mt-1 text-sm text-gray-400">
            Discover our newest stories.
          </p>
        </div>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          View All →
        </button>
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog, index) => (
          <article
            key={index}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#131B2D] transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-400">
                {blog.category}
              </span>

              <h3 className="mt-4 text-lg font-bold group-hover:text-blue-400">
                {blog.title}
              </h3>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                {blog.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <User size={14} /> {blog.author}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={14} /> {blog.date}
                </span>
              </div>

              <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-purple-400">
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
