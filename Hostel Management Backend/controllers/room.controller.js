const Room = require("../models/Room");

exports.addRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const result = await room.save();
    if (result) {
      res.status(201).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in add room", error);
  }
};

exports.getRoomsByHostelId = async (req, res) => {
  try {
    const hostelId = req.params.hostelId;
    const rooms = await Room.find({ hostelId: hostelId });
    if (rooms) {
      res.status(200).send({ message: "success!", data: rooms });
    } else {
      res.status(400).send({ message: "failed!", data: rooms });
    }
  } catch (error) {
    console.log("Error in get rooms", error);
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      res.status(200).send({ message: "success!", data: rooms });
    } else {
      res.status(400).send({ message: "failed!", data: rooms });
    }
  } catch (error) {
    console.log("Error in get rooms", error);
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (room) {
      res.status(200).send({ message: "success!", data: room });
    } else {
      res.status(400).send({ message: "failed!", data: room });
    }
  } catch (error) {
    console.log("Error in Delete Room", error);
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const data = req.body;
    const result = await Room.updateOne({ _id: req.params.id }, { ...data });
    if (result) {
      res.status(200).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in Update Room", error);
  }
};

exports.updateRoomStatus = async (req, res) => {
  try {
    const data = req.body;
    const available = (data.students.length = data.space ? false : true);
    const result = await Room.updateOne(
      { _id: req.params.id },
      { availability: available },
      { students: data.students }
    );
    if (result) {
      res.status(200).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in Update Room", error);
  }
};
