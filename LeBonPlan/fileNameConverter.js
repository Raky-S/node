const fileNameConverter = function (req, file, cb) {
  let ext = file.originalname.substring(
    file.originalname.lastIndexOf("."),
    file.originalname.length
  );
  cb(null, Date.now() + ext);
};
fileNameConverter();

module.exports = fileNameConverter;
