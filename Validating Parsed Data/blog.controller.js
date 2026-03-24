// Please don't change the pre-written code
export const validateBlog = (req, res) => {
  // Write your code here
  const { title, description, image } = req.body;
  const errors = {};

  // Validate title
  if (!title || title.trim() === "") {
    errors.title = "The title field should not be empty";
  } else if (title.length < 3) {
    errors.title = "The title field should contain at least 3 characters";
  }

  // Validate description
  if (!description || description.trim() === "") {
    errors.description = "The description field should not be empty";
  } else if (description.length < 10) {
    errors.description = "The description field should contain at least 10 characters";
  }

  // Validate image URL
  if (!image || image.trim() === "") {
    errors.image = "The image URL provided should be a valid URL";
  } else {
    // Simple URL validation
    try {
      new URL(image);
    } catch (err) {
      errors.image = "The image URL provided should be a valid URL";
    }
  }

  // If there are errors, return status 401 with errors
  if (Object.keys(errors).length > 0) {
    return res.status(401).render("addBlog", { 
      errors: errors, 
      success: false,
      blogData: { title, description, image } // Optional: to repopulate form fields
    });
  }

  // If validation passes, return status 201 with success message
  res.status(201).render("addBlog", { 
    errors: null, 
    success: true 
  });
};

export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: null, success: false });
};