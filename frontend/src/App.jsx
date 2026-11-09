import "./App.css";
import AddBlog from "./Components/Addblog";
import AllBlogs from "./Components/Blogs";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageBlogs from "./Components/Managebelog";
import Layout from "./Components/Layout";
import Navbar from "./Components/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/manage-blogs" element={<ManageBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
