const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// 👑 Get all users (ADMIN ONLY)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can view users" });
    }

    const users = await User.find().select("-password");
    res.json(users);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

module.exports = router;