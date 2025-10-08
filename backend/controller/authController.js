import bcrypt from "bcryptjs";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được đăng ký!" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: "user",
    });

    const saveUser = await newUser.save();
    res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        id: saveUser._id,
        username: saveUser.username,
        email: saveUser.email,
        role: saveUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email khong chính xác!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu không chính xác!" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { registerUser, loginUser };
