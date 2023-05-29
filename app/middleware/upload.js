const { storage } = require('debug/src/browser');
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-lms-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage1 });
module.exports = uploadFile;
