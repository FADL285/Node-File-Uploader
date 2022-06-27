const express = require('express');
const multer  = require('multer')

const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + (file.originalname.replace(/\s+/g, '-')).toLowerCase())
  },

})
const upload = multer({ storage: storageConfig })

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('avatar'), function(req, res) {
  const userData = req.body;
  const uploadedImageFile = req.file;
  console.log("DATA:");
  console.log(userData);
  console.log("FILE:");
  console.log(uploadedImageFile);
  res.redirect('/')
})

module.exports = router;
