const router = require("express").Router();
const {
  addRoom,
  deleteRoom,
  getRoomsByHostelId,
  updateRoom,
  updateRoomStatus,
  getRooms,
} = require("../controllers/room.controller");

router.post("/", addRoom);
router.get("/:hostelId", getRoomsByHostelId);
router.get("/", getRooms);
router.delete("/:id", deleteRoom);
router.put("/:id", updateRoom);
router.patch("/:id", updateRoomStatus);

module.exports = router;
