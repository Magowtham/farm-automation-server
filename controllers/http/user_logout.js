const userLogout = (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "logout successfull" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = userLogout;
