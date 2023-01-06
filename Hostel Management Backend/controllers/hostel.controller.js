const Hostel = require("../models/Hostel");

exports.addHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    const result = await hostel.save();
    if (result) {
      res.status(201).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in add hostel", error);
  }
};

exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    if (hostels) {
      res.status(200).send({ message: "success!", data: hostels });
    } else {
      res.status(400).send({ message: "failed!", data: hostels });
    }
  } catch (error) {
    console.log("Error in get all hostels", error);
  }
};

exports.getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (hostel) {
      res.status(200).send({ message: "success!", data: hostel });
    } else {
      res.status(400).send({ message: "failed!", data: hostel });
    }
  } catch (error) {
    console.log("Error in get hostel", error);
  }
};

exports.updateHostel = async (req, res) => {
  try {
    const data = req.body;
    const result = await Hostel.updateOne({ _id: req.params.id }, { ...data });
    if (result) {
      res.status(200).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in Update Hostel", error);
  }
};

exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    if (hostel) {
      res.status(200).send({ message: "success!", data: hostel });
    } else {
      res.status(400).send({ message: "failed!", data: hostel });
    }
  } catch (error) {
    console.log("Error in Delete Hostel", error);
  }
};
