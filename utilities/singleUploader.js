const multer = require("multer");

function uploader(sub_folder, allowed_ext, limits, common_error) {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${sub_folder}`;
  //storage setup
  const storage = multer.diskStorage({
    destination: UPLOAD_FOLDER,
    filename: (req, file, cb) => {},
  });
}
