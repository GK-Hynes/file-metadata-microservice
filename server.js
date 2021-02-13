const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: "./uploads" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;
    res.json({
      name: originalname,
      type: mimetype,
      size: size
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
