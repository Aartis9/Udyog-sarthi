const express = require('express');
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 3000;
cloudinaryConnect();
database.connect();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
)


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);




app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`)
})


















