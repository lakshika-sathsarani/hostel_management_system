const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  noOfRooms: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const Hostel = mongoose.model("Hostel", HostelSchema);
module.exports = Hostel;
