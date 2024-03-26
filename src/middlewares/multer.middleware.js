import multer from "multer";
import path from "path";
// Documentation Link : https://github.com/expressjs/multer#readme
// Disk Storage : I will use this for this project
// Memory Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

export const upload = multer({ storage: storage });