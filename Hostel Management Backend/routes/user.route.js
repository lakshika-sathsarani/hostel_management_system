const router = require("express").Router();
const {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  login,
  updateStudentHostel,
  userDelete,
} = require("../controllers/user.controller");

router.post("/", addUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.patch("/:id", updateStudentHostel);
router.post("/login", login);
router.delete("/:id", userDelete);

module.exports = router;
