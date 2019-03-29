const sharp = require('sharp');

// original image
// let originalImage = './demo/cmndNam.jpg';

// file name for cropped image
// let outputImage = './demo/croppedImage.jpg';
async function crop(originalImage, outputImage, w, h, x, y ){
    sharp(originalImage).extract({ width: w, height: h, left: x, top: y }).toFile(outputImage)
        .then(function (new_file_info) {
            console.log("Image cropped and saved");
        })
        .catch(function (err) {
            console.log("An error occured");
        });
    return true
}
module.exports.crop = crop;
