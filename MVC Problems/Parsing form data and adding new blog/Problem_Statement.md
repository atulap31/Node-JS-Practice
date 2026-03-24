Problem statement
Dive into a Node.js MVC application and expand its capabilities to expertly handle user-submitted form data.



Objectives:

Implement the following features within the existing codebase:

Render Blog Form:
i) Create a route handler for a GET request to '/createblog' in index.js.

ii) Complete the renderBlogForm function defined in blog.controller.js. The renderBlogForm function should serve as the controller for the '/createblog' route, rendering the 'addBlogForm' view.

iii) Add the necessary middleware to parse the request body.


Render Blogs:
i) Create a route handler for a GET request to '/' in index.js.

ii) Complete the renderBlogs function, as defined in blog.controller.js, to render the 'blogs' view. This view should display all the data from the 'blogs' array in blog.model.js.

iii) Additionally, implement the 'blogs' view, which will list all the data for the blogs.


Add New Blog:
i) Create a route handler for a POST request to '/addblog' in index.js.

ii) Complete the addBlog function defined in blog.controller.js to handle the user's POST request.

iii) Update the 'blogs' array in blog.model.js with the newly added blog.

iv) Render the 'blogs' view with the updated 'blogs' array to display the newly added blog along with the existing blogs.


Notes:

1. Review the provided scaffold folder carefully before writing code. Understanding how models, views, and controllers interact will help in implementing features correctly.
2. Follow the Node.js MVC pattern to maintain a clear separation of concerns among models, views, and controllers.
3. Utilize the EJS templating engine for rendering views.
4. Your responsibility is limited to the specified changes within the existing codebase.

