import client from "./mongodb-client";

export async function connectToMongodb() {
    const connection = await client;
    const collections = await connection.db().listCollections().toArray();
    console.log("#####################################");
    console.log("Collections : ");
    collections.forEach(collection => console.log(` - ${collection.name}`));
    console.log("#####################################");
}
