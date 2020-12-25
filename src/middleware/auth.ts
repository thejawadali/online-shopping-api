import jwt from "jsonwebtoken";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    
    var decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
