import { MONGODB_DATABASE } from "../configs/env-constant";
import { mongoClient } from "../configs/mongodb";
import { AUTHORITY_COLLECTION, createAuthoritySchema } from "./schemas/authority-schema";
import { TODO_COLLECTION, createTodoCollection } from "./schemas/todo-schema";
import { USER_COLLECTION, createUserchema } from "./schemas/user-schema";

(async () => {

    try {
        console.log('[MONGODB] init collection');

        // Create connection

        const connection = await mongoClient;
        const db = connection.db(MONGODB_DATABASE);

        // Drop all collections

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        if (collectionNames.includes(TODO_COLLECTION)) {
            await db.dropCollection(TODO_COLLECTION);
        }

        if (collectionNames.includes(AUTHORITY_COLLECTION)) {
            await db.dropCollection(AUTHORITY_COLLECTION);
        }

        if (collectionNames.includes(USER_COLLECTION)) {
            await db.dropCollection(USER_COLLECTION);
        }

        await createTodoCollection(db);
        await createAuthoritySchema(db);
        await createUserchema(db);

        // Close connection

        connection.close();


    } catch (error) {
        console.error(error);
    }

})()