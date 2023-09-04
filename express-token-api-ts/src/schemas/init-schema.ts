import { getDb } from "../configs/mongodb";
import { TODO_COLLECTION, createTodoCollection } from "./todo-schema";


export const initSchema = async () => {
    console.log('[MONGODB] init schema ...');
    const db = await getDb();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes(TODO_COLLECTION)) {
        await createTodoCollection(db);
    }
};

