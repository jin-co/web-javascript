const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cd) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = file.mimetype;
    cd(null, name + "-" + Date.now() + "." + ext);
  },
});

module.exports = multer({storage: storage}).single('image')
