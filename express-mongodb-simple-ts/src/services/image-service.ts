import { GridFSBucket } from "mongodb";
import getConnection from "../config/mongodb";



export const findByFilename = async (filename: string): Promise<any> => {
    const connection = await getConnection;
    const db = connection.db();
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    return bucket.find({filename});
}

