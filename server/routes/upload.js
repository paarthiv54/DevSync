import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { verifyToken } from '../middleware/verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    
    // Use 'raw' for documents (PPT, PDF, DOCX) to preserve format
    let resource_type = 'raw';
    if (isImage) resource_type = 'image';
    if (isVideo) resource_type = 'video';

    const filenameParts = file.originalname.split('.');
    const ext = filenameParts.pop();
    const filenameWithoutExt = filenameParts.join('.');
    const public_id = `${filenameWithoutExt.replace(/\s+/g, '_')}_${Date.now()}`;
    
    let params = {
      folder: 'devsync_documents',
      resource_type: resource_type,
    };

    // For 'raw' files, adding the extension to public_id ensures the final URL has the correct format
    if (resource_type === 'raw') {
      params.public_id = `${public_id}.${ext}`;
    } else {
      params.public_id = public_id;
    }

    return params;
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // req.file.path contains the secure Cloudinary URL
  res.status(200).json({ secure_url: req.file.path });
});

export default router;
