const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  JWT_KEY = process.env.JWT_KEY;

  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, JWT_KEY);
    req.userData = { userERP: decodedToken.ERP, userName: decodedToken.name, userRole: decodedToken.userRole };
    console.log("Authenticated Successfully")
    next();
  } catch (err) {
    console.log("Authentication failed")
    return next(err);
  }
};