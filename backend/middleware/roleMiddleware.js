// authorizeRoles(...roles) ek function hai jo roles ka array accept karta hai.
// Ye function ek middleware return karta hai (req, res, next) => { ... }

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user.role JWT se aaya hua user ka role hai (auth middleware ke through set hua tha).
    // roles.includes(req.user.role) check karega ki kya us user ka role allowed roles ke andar hai ya nahi.
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};
