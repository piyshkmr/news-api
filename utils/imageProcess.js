const sharp = require("sharp");

module.exports = async (req, id) => {
  const originalFileNameWithoutSpace = req.file.originalname
    .split(" ")
    .join("-");

  const filename = `/${id}-${originalFileNameWithoutSpace}`;
  await sharp(req.file.buffer)
    .resize({ width: 600, height: 300 })
    .toFile("./uploads" + filename);
  return filename;
};
