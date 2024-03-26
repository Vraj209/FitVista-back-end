import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

          
cloudinary.config({ 
  cloud_name: 'dvwynnvhq', 
  api_key: '135959228787444', 
  api_secret: 'Or1h2Nw4t5CTP2GGP50MW9M5Ndg' 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //   upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //   file has been uploaded successfully
    console.log(
      "SUCCESS :: File Uploaded :: File has been uploaded successfull on cloudinary :: ",
      response.url
    );
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file after upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.error(
      "FAILD :: File Not Uploaded :: File has not been uploaded on cloudinary :: ",
      error
    );
    return null;
  }
};

export { uploadOnCloudinary };
