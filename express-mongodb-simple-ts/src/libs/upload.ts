import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import getConnection from "../config/mongodb";


export async function getMulter() {
    const connection = await getConnection;
    const db = connection.db();

    const storage = new GridFsStorage({ db });

    return multer({ storage })
}