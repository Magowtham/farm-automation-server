const jwt = require("jsonwebtoken");
const verifyToken = (req, res) => {
  try {
    const token = req.headers.cookie?.replace("token=", "");
    jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
      console.log(err);
      if (err) {
        res.status(401).json({ message: "invalid token" });
        return;
      }
      res.status(200).json({ message: "valid token", decodedData: decoded });
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = verifyToken;
