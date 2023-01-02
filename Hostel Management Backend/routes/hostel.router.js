const router = require("express").Router();

const {
  addHostel,
  deleteHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
} = require("../controllers/hostel.controller");

router.post("/", addHostel);
router.get("/", getAllHostels);
router.get("/:id", getHostelById);
router.delete("/:id", deleteHostel);
router.put("/:id", updateHostel);

module.exports = router;
