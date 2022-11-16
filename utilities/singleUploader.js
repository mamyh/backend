const multer = require("multer");
const path = require('path')
const createHttpError = require("http-errors");

function uploader(sub_folder,
                  allowed_file_types, 
                  limits,
                   error_msg
        ) {
  //file upload folder
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${sub_folder}`;
  //define the storage
  const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, UPLOAD_FOLDER)
    }
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname)
      const fileName = file.originalname
                            .replace(fileExt,"")
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-"+Date.now();
          cb(null,fileName+fileExt)
    },
  });
  const upload = multer({
    storage,
    limits,
    fileFilter:(req,file,cb)=>{
      if(allowed_file_types.includes(file.mimetype)){
        cb(null,true)
      }else{
        cb(createHttpError(error_msg))
      }
    }

  })
  return upload
}
