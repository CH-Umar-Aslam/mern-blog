import { Router } from "express"
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsAuthenticated from "../middlewares/authMiddleware.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `public/upload`),
  filename: (req, file, cb) => cb(null,
    `${Date.now()}-${file.originalname}`
  )
})

const upload = multer({ storage: storage });
//Auth Routes
const router = Router();
router.post("/api/register",
  AuthController.userRegistration);

router.post("/api/login",
  AuthController.userLogin);


// Blog Routes

router.get("/getall/blogs",
  checkIsAuthenticated,
  BlogController.getAllBlogs);

router.get("/get/blog/:id",
  checkIsAuthenticated,

  BlogController.getSingleBlog);

router.post("/add/blog",
  checkIsAuthenticated, upload.single("thumbnail"),
  BlogController.addNewBlog);


// Category Routes

router.get("/getall/categories",
  checkIsAuthenticated,
  CategoryController.getAllCategories)

router.post("/add/category",
  checkIsAuthenticated,
  CategoryController.addNewCategory)


export default router;
