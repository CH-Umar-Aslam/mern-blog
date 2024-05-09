import authModel from "../models/auth.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email: email }).exec();
        if (isUser) {
          return res
            .status(400)
            .json({ message: "user account already exists" })


        } else {


          const genSalt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, genSalt);
          const newuser = new authModel({
            username,
            email,
            password: hashedPassword,
          })
          const savedUser = await newuser.save();
          if (savedUser) {
            return res
              .status(200)
              .json({ message: "user account created successfully" })
          }
        }
      }
      else {
        return res
          .status(400)
          .json({ message: "All fields are required" })

      }

    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message })

    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmail = await authModel.findOne({ email: email });

        if (isEmail) {

          if (isEmail.email === email && (await bcrypt.compare(password, isEmail.password))) {
            const token = jwt.sign({ UserID: isEmail._id }, "pleasesubscribe", {
              expiresIn: "2d"
            })


            return res
              .status(200)
              .json({
                token,
                message: "Logged in Successfully",
                username: isEmail.username,
                isEmail: isEmail._id
              })

          }

          else {
            return res
              .status(400)
              .json({ message: "Wrong Credentials" })
          }

        }
        else {
          return res
            .status(400)
            .json({ message: "Email Account Not Found" })
        }
      } else {
        return res
          .status(400)
          .json({ message: "All Fields are required" })
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message })
    }
  };
}

export default AuthController;