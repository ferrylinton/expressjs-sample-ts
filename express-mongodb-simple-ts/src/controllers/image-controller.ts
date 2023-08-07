import { NextFunction, Request, Response } from 'express';
import { GridFSBucket } from 'mongodb';
import getConnection from "../config/mongodb-client";
import * as imageService from '../services/image-service';

export async function find(req: Request, res: Response, next: NextFunction) {
    try {
        const images = await imageService.find()
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
};

export async function findByFilename(req: Request, res: Response, next: NextFunction) {
    try {
        const filename = req.params.filename;
        const connection = await getConnection;
        const db = connection.db();
        const bucket = new GridFSBucket(db, { bucketName: 'images' });

        const files = await bucket.find({ filename }).toArray();

        if (files && files.length > 0) {
            const image = files[0];
            res.setHeader('Content-Type', image.contentType || 'image/jpeg');
            res.setHeader('Content-Length', image.length || '0');
            bucket.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

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

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        await imageService.deleteById(req.params.id);
        res.status(200).json({ message: 'Data is deleted' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};