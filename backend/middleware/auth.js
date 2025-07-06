import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, LogIn again !!",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // ✅ Fix here
    next();
  } catch (error) {
    console.log("Token Error:", error);
    return res.json({
      success: false,
      message: "Token is not valid, LogIn again !!",
    });
  }
};

export default authMiddleware;
