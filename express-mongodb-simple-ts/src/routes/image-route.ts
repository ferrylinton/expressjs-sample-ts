import { Router } from 'express';
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import * as imageController from '../controllers/image-controller';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file(_request, file) {
        return {
            bucketName: "images",
            filename: file.originalname,
        };
    },
});
const upload = multer({ storage });

const router = Router();
router.get("/:filename", imageController.findByFilename);
router.post('/', upload.single("file"), imageController.create);

export default router;