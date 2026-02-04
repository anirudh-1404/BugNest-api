import { User } from "../modals/user.schema.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({
      message: "User created successfully!",
      id: user._id,
      data: { email: user.email, name: user.name },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const isEmailExists = await User.findOne({ email });

    if (!isEmailExists) {
      return res.status(404).json({
        message: "User does not exists!",
      });
    }

    return res.status(200).json({
      message: "Login suceessfull!",
      id: isEmailExists._id,
      data: { email: isEmailExists.email },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
