import blogModel from "../models/blog.model.js"

class blogController {
  static addNewBlog = async (req, res) => {
    const { title, category, description } = req.body;

    try {
      console.log(req.user);

      if (title && category) {


        const AddBlog = new blogModel({
          title: title,
          description: description,
          category: category,
          thumbnail: req.file.filename,
          user: req.user._id
        })
        const savedBlog = await AddBlog.save();


        if (savedBlog) {
          return res.status(200).json({ message: "Blog Added Succefully" })
        }

      } else {
        return res.status(400).json({ message: "All fields are required" })
      }

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

  }
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await blogModel.find({ user: req.user._id });
      if (fetchAllBlogs) {
        return res.json(fetchAllBlogs)
      }
    } catch (error) {

      return res.status(400).json({ message: error.message })

    }

  }
  static getSingleBlog = async (req, res) => {
    try {
      const id = req.params.id;

      if (id) {
        const fetchSingleBlog = await blogModel.findById(id);
        if (fetchSingleBlog) {
          return res.status(200).json(fetchSingleBlog);

        } else {
          return res.status(400).json({ message: "Invalid Url" });
        }
      }

    } catch (error) {

    }

  }
}

export default blogController;