import express from "express";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/blog.js"
import cors from "cors"
const app = express();



connectToDb();
app.use(cors());
app.use(express.json());

const PORT = 9000;


app.use(express.static("public/upload"))
app.get('/', (req, res) => {
  res.send("api is running")
})

app.use("/user/v1", authRoutes);






app.listen(PORT, () => {
  console.log(`server is running on port https://localhost/${PORT}`)
})