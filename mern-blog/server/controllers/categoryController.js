import categoriesModel from "../models/category.model.js"

class categoryController {
  static getAllCategories = async (req, res) => {
    try {
      const categories = await categoriesModel.find();
      if (categories) {
        return res.json(categories);
      } else {
        return res.json({ message: "get all categories failed" });
      }

    } catch (error) {
      return res.status(400)
        .json({ message: error.message })
    }
  }
  static addNewCategory = async (req, res) => {

    const { title } = req.body;
    try {
      if (title) {
        const newCatgory = new categoriesModel(
          {
            title
          }
        );

        const saveCategory = newCatgory.save()
        if (saveCategory) {
          return res.send({
            title,
            message: "category added successfully"
          })
        } else {
          res
            .status(400)
            .json({ message: "category addition failed" })
        }


      } else {
        res
          .status(400)
          .json({ message: "all fields are required" })
      }

    }
    catch (error) {
      res
        .status(400)
        .json({ message: error.message })
    }

  }
}

export default categoryController