const multer = require("multer");
const storage = multer.memoryStorage();

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (_, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
