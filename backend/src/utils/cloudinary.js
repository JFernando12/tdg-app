const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs-extra");

cloudinary.config({
    cloud_name: "dnjmxt14w",
    api_key: "826188237694693",
    api_secret: "e368YQ9TPXCi8Ngpt3yDwvg-oqA",
    secure: true
})

const uploadCloudinary = async(file) => {
    const image = file.path;
    console.log(image);
    const result = await upload_cloudinary(image);
    console.log("despues")
    console.log(result);
    await fs.remove(image);
    return result.url;
    
}

const upload_cloudinary = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    })
}

const deleteCloudinary = async(url) => {
    let publid_id = "";
    for(let i = (url.length - 1); i > 0; i --) {
        publid_id = url[i] + publid_id;
        if(url[i - 1] == "/") {
            i = 0;
        }
    }
    publid_id = publid_id.replace(path.extname(publid_id), "");
    await cloudinary.uploader.destroy(publid_id);
}

module.exports = {
    uploadCloudinary,
    deleteCloudinary
}