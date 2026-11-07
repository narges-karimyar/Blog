import "./App.css";
import AddBlog from "./Components/Addblog";
import Aside from "./Components/Aside";
import AllBlogs from "./Components/Blogs";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageBlogs from "./Components/Managebelog";
import Navigation from "./Components/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-[#090D18]">
          <Aside />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/manage-blogs" element={<ManageBlogs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
