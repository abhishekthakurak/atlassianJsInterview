const Client = require("./services/client");

const apiKey = "4a8e3990b0e0559b77430f4ddb28a3cb"; // we can make this secure and make a environment file

const fetchBlogs = async () => {
  try {
    const client = new Client(apiKey);
    const blogs = await client.getLatestBlog();
    if (blogs.status === 200) {
      return blogs.response;
    }
    throw Error("unable to fetch blogs");
  } catch (error) {
    console.log(error);
  }
};

fetchBlogs().then((blogs) => {
  console.log(blogs);
});
