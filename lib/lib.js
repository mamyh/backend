//dependencies
const fs = require("fs");
const path = require("path");
//module scaffolding
const lib = {};

//base directory
lib.basedir = path.join(__dirname, "../.data/");

lib.createData = (dir, file, data, callback) => {
  //file open to write
  fs.open(
    `${lib.basedir}/${dir}/${file}.json`,
    "wx",
    (err1, fileDescriptor) => {
      if (!err1 && fileDescriptor) {
        //stringify the data
        const dataStringify = JSON.stringify(data);
        //write file with the data
        fs.writeFile(fileDescriptor, dataStringify, (err2) => {
          if (!err2) {
            //closing the file
            fs.close(fileDescriptor, (err3) => {
              if (!err3) {
                callback("Successfully file has been writed with the data");
              } else {
                callback("Error in closing the file");
              }
            });
          } else {
            callback("Error in Writing the File ");
          }
        });
      } else {
        callback("Error in opening File , Maybe file exists in this director");
      }
    }
  );
};

module.exports = lib;
