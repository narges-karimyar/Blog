import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  BookOpen,
  PlusCircle,
  LayoutDashboard,
  Search,
  Grid2X2,
  Flame,
} from "lucide-react";

export default function Aside() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Technology");

  const links = [
    { name: "Home", icon: Home, path: "/" },
    { name: "All Blogs", icon: BookOpen, path: "/blogs" },
    { name: "Add Blog", icon: PlusCircle, path: "/add-blog" },
    {
      name: "Manage Blogs",
      icon: LayoutDashboard,
      path: "/manage-blogs",
    },
  ];

  const categories = [
    "Technology",
    "Lifestyle",
    "Education",
    "Design",
    "Other",
  ];

  const popularPosts = [
    {
      title: "Build Your Dream Career",
      date: "Apr 12, 2026",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200",
    },
    {
      title: "React Tips for Beginners",
      date: "Apr 10, 2026",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col overflow-y-auto border-r border-white/10 bg-[#101525] p-5 text-white">
      {/* Logo */}
      <div className="mb-9 text-center">
        <BookOpen className="mx-auto mb-3 h-12 w-12 text-blue-400" />

        <h1 className="text-2xl font-bold">PULSE</h1>

        <p className="mt-1 text-sm text-gray-400">Read • Learn • Grow</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={21} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="my-6 border-t border-white/10" />

      {/* Search */}
      <div className="relative">
        <Search size={19} className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="mt-7">
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <Grid2X2 size={19} className="text-blue-400" />
          Categories
        </h3>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                category === item
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="my-6 border-t border-white/10" />

      {/* Popular Posts */}

      {/* Footer */}
      <div className="mt-auto pt-8 text-center text-xs text-gray-400">
        © 2026 PULSE
      </div>
    </aside>
  );
}
