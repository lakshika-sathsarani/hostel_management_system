const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    hostelId: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default:true,
    },
    space: {
        type: Number,
        default: 4,
    },
    students:[String]

});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
