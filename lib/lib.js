// dependencies
const fs = require('fs');
const path = require('path');
// module scaffolding
const lib = {};

// base directory
lib.basedir = path.join(__dirname, '../.data/');

lib.create = (dir, file, data, callback) => {
    // file open to write
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'wx', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            // stringify the data
            const dataStringify = JSON.stringify(data);
            // write file with the data
            fs.writeFile(fileDescriptor, dataStringify, (err2) => {
                if (!err2) {
                    // closing the file
                    console.log(fileDescriptor);
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error in closing the file', err3);
                        }
                    });
                } else {
                    callback('Error in Writing the File ', err2);
                }
            });
        } else {
            callback('Error in opening File , Maybe file exists in this director', err1);
        }
    });
};

lib.read = (dir, file, callback) => {
    // file  to read
    fs.readFile(`${lib.basedir}/${dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

lib.update = (dir, file, data, callback) => {
    // file open to update
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'r+', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // truncate the file
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    // write file updated data
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            // closing the updated file
                            fs.close(fileDescriptor, (err4) => {
                                if (!err4) {
                                    console.log(fileDescriptor);
                                    callback(false);
                                } else {
                                    callback('Error in closing updated file');
                                }
                            });
                        } else {
                            callback('Error in writing data to the existing file');
                        }
                    });
                } else {
                    callback('Error in truncating file to update');
                }
            });
        } else {
            callback('Error in opening file to update , maybe file does not exists');
        }
    });
};

lib.remove = (dir, file, callback) => {
    // remove file
    fs.unlink(`${lib.basedir}/${dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Erron in deleting file from existing folder');
        }
    });
};
module.exports = lib;
