import { MONGODB_DATABASE } from "../../configs/env-constant";
import { mongoClient } from "../../configs/mongodb";
import { AUTHORITY_COLLECTION } from "../schemas/authority-schema";
import { TODO_COLLECTION } from "../schemas/todo-schema";
import { USER_COLLECTION } from "../schemas/user-schema";
import { WHITELIST_COLLECTION } from "../schemas/whitelist-schema";


(async () => {

    try {
        console.log('[MONGODB] drop collection');

        // Create connection

        const connection = await mongoClient;
        const db = connection.db(MONGODB_DATABASE);

        // Get existing collections
        
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        // Drop all collections

        if (collectionNames.includes(WHITELIST_COLLECTION)) {
            await db.dropCollection(WHITELIST_COLLECTION);
        }

        if (collectionNames.includes(TODO_COLLECTION)) {
            await db.dropCollection(TODO_COLLECTION);
        }

        if (collectionNames.includes(AUTHORITY_COLLECTION)) {
            await db.dropCollection(AUTHORITY_COLLECTION);
        }

        if (collectionNames.includes(USER_COLLECTION)) {
            await db.dropCollection(USER_COLLECTION);
        }

        // Close connection

        connection.close();


    } catch (error) {
        console.error(error);
    }

})()