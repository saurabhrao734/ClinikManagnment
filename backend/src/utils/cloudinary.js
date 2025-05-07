import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
});

const uploadOnCloudinary = async (localPath) => {
    if (!localPath) return null;

    try {
        const response = await cloudinary.uploader.upload(localPath);
        console.log(localPath);
        fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
};

export { uploadOnCloudinary };
