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
    const filenameParts = file.originalname.split('.');
    const ext = filenameParts.pop().toLowerCase();
    const filenameWithoutExt = filenameParts.join('.');
    const public_id = `${filenameWithoutExt.replace(/\s+/g, '_')}_${Date.now()}`;
    
    // Use 'raw' for documents so Cloudinary does not attempt image processing which fails for PDFs on free/default tiers.
    let resource_type = 'auto';
    const rawExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'csv', 'zip', 'rar'];
    
    if (rawExtensions.includes(ext)) {
      resource_type = 'raw';
    }

    let params = {
      folder: 'devsync_documents',
      resource_type: resource_type,
      // For raw files, Cloudinary requires the extension to be part of the public_id
      public_id: resource_type === 'raw' ? `${public_id}.${ext}` : public_id,
    };

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
