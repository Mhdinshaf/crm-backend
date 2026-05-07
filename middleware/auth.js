const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Access Denied. No token provided." 
    });
  }

  try {
  
    const bearerToken = token.startsWith("Bearer ") 
      ? token.slice(7) 
      : token;
    
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      message: "Invalid Token." 
    });
  }
};
