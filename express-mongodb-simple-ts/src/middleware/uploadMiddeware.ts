import { NextFunction, Request, Response } from 'express';
import { Db } from "mongodb";
import multer, { FileFilterCallback } from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongodbClient from "../config/mongodb-client";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const EXTENSIONS = ['svg', 'png', 'jpeg', 'jpg', 'gif'];
const FILE_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

let storage: any;

async function getStorage(db: Db) {
    if (storage === undefined || storage === null) {
        storage = new GridFsStorage({
            db,
            file(_request, file) {
                return {
                    bucketName: "images",
                    filename: file.originalname,
                };
            },
        });
    }

    return storage;
}

function fileFilter(req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    try {
        if (parseInt(req.headers['content-length'] as string) > MAX_FILE_SIZE) {
            return callback(new Error('File too large, max 3mb'));
        }

        const fileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);

        if (!EXTENSIONS.includes(fileExtension) || !FILE_TYPES.includes(file.mimetype)) {
            return callback(new Error('Invalid file image'));
        }


        return callback(null, true);
    } catch (error: any) {
        return callback(error);
    }
}

export async function uploadImage(req: Request, res: Response, next: NextFunction) {
    const connection = await mongodbClient;
    const storage = await getStorage(connection.db())
    const upload = multer({ storage, fileFilter }).single("file");

    upload(req, res, function (err: any) {
        if (err) {
            next(err)
        } else {
            next();
        }
    })

}