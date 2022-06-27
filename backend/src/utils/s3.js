require("dotenv").config()
const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
const uploadFile = async(file) => {
    let ContentType = "image/jpeg";
    if(path.extname(file.path) === ".png") {
        ContentType = "image/png";
    }
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        ContentType
    }

    const result = await s3.upload(uploadParams).promise();
    const location = result.Location;

    fs.unlinkSync(file.path);

    return location;
}

const deleteFile = async(Key) => {
    const deleteParams = {
        Bucket: bucketName,
        Key
    }

    await s3.deleteObject(deleteParams).promise();
}

module.exports = {
    uploadFile,
    deleteFile
}

// dowloads a file from s3