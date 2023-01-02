const router = require("express").Router();
const {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  login,
  updateStudentHostel,
} = require("../controllers/user.controller");

router.post("/", addUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.patch("/:id", updateStudentHostel);
router.post("/login", login);

module.exports = router;
