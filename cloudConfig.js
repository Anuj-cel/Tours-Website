const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({   // mean connecting cloudinary with the account
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req, file) => 'wonderplaces_DEV', // in cloudinary the folder name
      allowedFormats: ["png","jpg","jpeg"], // formats of img 
    },
  });
  module.exports={cloudinary,storage};