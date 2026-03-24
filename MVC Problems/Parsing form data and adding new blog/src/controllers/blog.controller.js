// Please don't change the pre-written code
// Import the necessary modules here
import { blogs } from "../models/blog.model.js";

export const renderBlogs = (req, res) => {
  // Write your code here
  return res.render("blogs", { blogs });
};

export const renderBlogForm = (req, res) => {
  // Write your code here
  return res.render("addBlogForm");
};

export const addBlog = (req, res) => {
  // Write your code here
  const { title, description, img } = req.body;
  
  // Add new blog to the blogs array
  const newBlog = { title, description, img };
  blogs.push(newBlog);
  
  // Render the blogs view with updated array
  return res.render("blogs", { blogs });
};