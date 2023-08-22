import { GridFSBucket, ObjectId } from "mongodb";
import getConnection from "../config/mongodb-client";
import { Image } from "../types/image";

export const find = async (): Promise<Image[]> => {
    const connection = await getConnection;

    const images: Image[] = [];
    const imageCollection = connection.db().collection<Image>('images.files');
    const cursor = imageCollection.find({}, {
        sort: { filename: 1 }
    });

    for await (const doc of cursor) {
        images.push({
            id: doc._id.toHexString(),
            filename: doc.filename,
            contentType: doc.contentType,
            uploadDate: doc.uploadDate
        })
    }

    return images;
}

export const findById = async (id: string): Promise<Image | null> => {

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const filter = {
        _id: new ObjectId(id)
    };

    const connection = await getConnection;
    const imageCollection = connection.db().collection<Image>('images.files');
    const Image = await imageCollection.findOne(filter) as Image;

    if (Image) {
        Image.id = (Image._id as ObjectId).toHexString();
        return Image;
    } else {
        return null;
    }
}

export const findByFilename = async (filename: string): Promise<Image | null> => {
    const connection = await getConnection;
    const imageCollection = connection.db().collection<Image>('images.files');
    const Image = await imageCollection.findOne({ filename }) as Image;

    if (Image) {
        Image.id = (Image._id as ObjectId).toHexString();
        return Image;
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<void> => {
    if (!ObjectId.isValid(id)) {
        throw new Error('Data is not found')
    }

    const connection = await getConnection;
    const db = connection.db();
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    await bucket.delete(new ObjectId(id));
}
