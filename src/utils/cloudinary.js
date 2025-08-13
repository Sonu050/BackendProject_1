import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs'



    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });


const uploadOnCloudinary = async (localFilePath) => {
    try {


        if (!localFilePath) return null
        // UPLODE THE FILE ON CLOUDINARY
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // FILE HAS BEEN UPLOADED
        // console.log("File is uploaded !", response.url);
        fs.unlinkSync(localFilePath)

        return response;


    } catch (err) {

        // remove the locally saved temporary file as the upload operatuin got failed
        fs.unlinkSync(localFilePath)
        return null;

    }
}


export { uploadOnCloudinary }