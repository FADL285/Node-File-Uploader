const express = require("express");
const multer = require("multer");
const db = require("../data/database");

const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "-" +
        file.originalname.replace(/\s+/g, "-").toLowerCase()
    );
  },
});
const upload = multer({ storage: storageConfig });

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("avatar"), async function (req, res) {
  const userData = req.body;
  const uploadedImageFile = req.file;
  await db.getDb().collection("users").insertOne({
    name: userData.username,
    avatar: uploadedImageFile.path,
  });
  res.redirect("/");
});

module.exports = router;
