import { NavLink } from "react-router-dom";
import { Search, Bell, ChevronDown, BookOpen } from "lucide-react";

const Navigation = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Blogs", path: "/blogs" },
    { name: "Add Blog", path: "/add-blog" },
    { name: "Manage Blogs", path: "/manage-blogs" },
  ];

  return (
    <nav
      className="w-full h-[90px] px-8 flex items-center justify-between 
      bg-[#0B1022]/90 backdrop-blur-xl border border-white/10 
      rounded-[24px] shadow-lg"
    >
      {/* Navigation Links */}
      <div className="flex items-center gap-10">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `relative py-3 text-[17px] font-medium transition-all duration-300
              ${isActive ? "text-[#38BDF8]" : "text-gray-300 hover:text-white"}`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[3px]
                    rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div
          className="flex items-center gap-3 px-5 py-3 w-[230px]
          rounded-full bg-white/[0.05] border border-white/10
          focus-within:border-blue-500/60 transition-all"
        >
          <Search size={21} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-white
              placeholder:text-gray-400 text-sm"
          />
        </div>

        {/* Notification */}
        <button className="relative text-gray-300 hover:text-white transition">
          <Bell size={23} />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5
            rounded-full bg-purple-500 border-2 border-[#0B1022]"
          />
        </button>

        <div className="h-9 w-px bg-white/15" />

        {/* Profile */}
        <button
          className="flex items-center gap-3 text-gray-300
          hover:text-white transition"
        >
          <div
            className="w-11 h-11 rounded-full flex items-center
            justify-center bg-gradient-to-br from-blue-500 to-purple-600"
          >
            <BookOpen size={21} className="text-white" />
          </div>
          <ChevronDown size={17} />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
