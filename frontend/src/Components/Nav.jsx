import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  BookOpen,
  PlusCircle,
  LayoutDashboard,
  Search,
  Menu,
  X,
  Bell,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", icon: Home, path: "/" },
    { name: "All Blogs", icon: BookOpen, path: "/blogs" },
    { name: "Add Blog", icon: PlusCircle, path: "/add-blog" },
    { name: "Manage Blogs", icon: LayoutDashboard, path: "/manage-blogs" },
  ];

  return (
    <nav className="relative z-50 mb-8 w-full rounded-2xl border border-white/10 bg-[#0B1022]/95 px-4 py-4 text-white shadow-lg backdrop-blur-xl sm:px-6">
      <div className="flex min-h-[55px] items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <BookOpen size={32} className="text-blue-400" />
          <div>
            <h1 className="text-xl font-bold tracking-wider">PULSE</h1>
            <p className="text-[10px] text-gray-400">Read • Learn • Grow</p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-300 hover:text-white">
            <Bell size={21} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-purple-500" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-5 lg:hidden">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
