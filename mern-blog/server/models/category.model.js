import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({

  title: {
    type: String
  }
})

const categoriesModel = mongoose.model("categories", categorySchema);
export default categoriesModel;