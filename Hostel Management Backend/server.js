const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const UserRoutes = require("./routes/user.route");
app.use("/api/user", UserRoutes);
const RoomRoutes = require("./routes/room.route");
app.use("/api/room", RoomRoutes);
const HostelRoutes = require("./routes/hostel.router");
app.use("/api/hostel", HostelRoutes);

const port = process.env.PORT || 4000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, (err) => {
  if (err) {
    console.log("mongo connection error ", err);
  } else {
    console.log("Mongodb connection success");
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is up and running on port: ${port}`);
  } else {
    console.log("Server Connection Error ", err);
  }
});
