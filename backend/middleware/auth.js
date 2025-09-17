import jwt from "jsonwebtoken";

function auth(req, res, next) {
  // Jab frontend se req ata hai toh usme ek Authorization header hota hai
  // Niche wale line m humlog Authorization m jo bhi hai usko extarct krke authHeader m rakh rahe hai
  const authHeader = req.header("Authorization");
  // Abb sara content jo paye the usme se sirf token chahiye usko nikal rahe hai
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // Agar token nahi milta hai toh error return kar denge
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied." });

  try {
    // If error nhi hua toh token m se _id, role, etc jo bhi diye the usko extract kr rahe hai

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user m save kar rahe hai
    req.user = decoded;

    // aab hum log ka kaam khtm ho gaya hai middleware ko agge bhadne bol rahe hai
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

export default auth;
