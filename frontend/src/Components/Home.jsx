import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../Components/Nav";

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
    <main className="ml-0 min-h-screen bg-[#090D18] p-4 pt-20 text-white sm:p-6 sm:pt-20  lg:p-8">
      {/* Navigation */}
      <Navigation />

      {/* Top Heading */}
      <div className="mb-8 mt-4">
        <p className="text-sm font-medium tracking-wider text-blue-400">
          WELCOME BACK
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Explore the World of Ideas
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          Stories, knowledge and inspiration in one place.
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative mb-10 mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 lg:mb-12 lg:p-10">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-xs sm:text-sm">
            ✨ Discover something new
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Ideas That Inspire.
            <br />
            Stories That Matter.
          </h2>

          <p className="mt-4 text-sm leading-6 text-blue-100 sm:text-base">
            Explore interesting articles, learn new things and share your own
            stories with the world.
          </p>

          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:scale-105 sm:px-6 sm:text-base"
          >
            Explore Blogs
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Background Decoration */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
      </section>

      {/* Latest Blogs Heading */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">Latest Blogs</h2>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Discover our newest stories.
          </p>
        </div>

        <Link
          to="/blogs"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          View All →
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        {blogs.map((blog, index) => (
          <article
            key={index}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#131B2D] transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden sm:h-52">
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-400">
                {blog.category}
              </span>

              <h3 className="mt-4 text-lg font-bold transition group-hover:text-blue-400">
                {blog.title}
              </h3>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                {blog.description}
              </p>

              {/* Blog Information */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <User size={14} />
                  {blog.author}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  {blog.date}
                </span>
              </div>

              {/* Read More */}
              <Link
                to="/blogs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-purple-400"
              >
                Read More
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
