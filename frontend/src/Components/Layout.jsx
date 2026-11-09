import { Outlet } from "react-router-dom";
import Navbar from "./Nav";

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-[#090D18] p-4 text-white sm:p-6 lg:p-8">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
