const express = require("express");
const { signUp, signIn } = require("../controllers/userController"); // ✅ Correct import

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", (req, res, next) => {
    console.log("Sign-in Route Hit! Request Body:", req.body);
    next();
  }, signIn);

module.exports = router;
