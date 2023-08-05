import { NextFunction, Request, Response } from 'express';
import { GridFSBucket } from 'mongodb';
import getConnection from "../config/mongodb";

export async function findByFilename(req: Request, res: Response, next: NextFunction) {
    try {
        const filename = req.params.filename;
        const connection = await getConnection;
        const db = connection.db();
        const bucket = new GridFSBucket(db, { bucketName: 'images' });

        const files = await bucket.find({ filename }).toArray();
        res.setHeader('Content-Type', files[0]?.contentType || 'image/jpeg');
        res.setHeader('Content-Length', files[0]?.length || '0');
        bucket.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {
        next(error);
    }
};

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.file === undefined) {
            return res.status(200).json({ message: "you must select a file." });
        } else {
            const imgUrl = `http://localhost:${process.env.PORT}/file/${req.file.filename}`;
            res.status(200).json({ imgUrl });
        }
    } catch (error) {
        next(error);
    }
};