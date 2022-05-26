const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("File Error");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
});

module.exports = multer({storage: storage}).single("image")
