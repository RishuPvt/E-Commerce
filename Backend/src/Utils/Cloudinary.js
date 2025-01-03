import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dzla66tsb",
  api_key: "332284628768572",
  api_secret: "KhngVEvUAtt-MphcquALOBuclOI",
});
//console.log("Cloudinary Config: ", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("Uploading to Cloudinary:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (response) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new Error("Cloudinary deletion unsuccessful");
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error.message || error);
    throw new Error("Error while deleting the avatar on Cloudinary");
  }
};

export { uploadOnCloudinary , deleteOnCloudinary };
