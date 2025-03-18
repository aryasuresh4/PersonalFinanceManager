// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: decoded.userId }; // ✅ Ensure `userId` is passed correctly
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

