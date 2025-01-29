// backend/middleware/auth.js
module.exports = async (req, res, next) => {
    try {
      // Na potrzeby developmentu używamy mocka użytkownika
      // W produkcji tutaj byłaby weryfikacja tokenu JWT
      req.user = {
        _id: "507f1f77bcf86cd799439011", // Mock ID użytkownika
        name: "Test User",
        email: "test@test.com"
      };
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  };