const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔴 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    // 🔴 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 👤 Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "member"
    });

    // ✅ Response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  // 🔥 IMPORTANT CHANGE
  res.json({
    token,
    role: user.role
  });
};