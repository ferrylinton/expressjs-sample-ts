import { ObjectId } from "mongodb";
import { COLLECTION_AUTHORITIES } from "../config/db-constant";
import getConnection from "../config/mongodb";
import { Authority } from "../types/authority";


export const find = async (): Promise<Authority[]> => {
    const connection = await getConnection;

    const authorities: Authority[] = [];
    const authoritiesCollection = connection.db().collection<Authority>(COLLECTION_AUTHORITIES);
    const cursor = authoritiesCollection.find();

    for await (const doc of cursor) {
        authorities.push({
            id: doc._id.toHexString(),
            name: doc.name,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        })
    }

    return authorities;
}

export const findById = async (id: string): Promise<Authority | null> => {

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const filter = {
        _id: new ObjectId(id)
    };

    const connection = await getConnection;
    const authoritiesCollection = connection.db().collection<Authority>(COLLECTION_AUTHORITIES);
    const authority = await authoritiesCollection.findOne(filter) as Authority;

    if (authority) {
        authority.id = (authority._id as ObjectId).toHexString();
        return authority;
    } else {
        return null;
    }
}

export const save = async (name: string): Promise<Authority | null> => {
    const connection = await getConnection;
    const authoritiesCollection = connection.db().collection<Authority>(COLLECTION_AUTHORITIES);

    const now = new Date();
    const newAuthority: Authority = {
        name,
        createdAt: now,
        updatedAt: now
    }
    const { insertedId: id } = await authoritiesCollection.insertOne(newAuthority);
    if(id){
        newAuthority._id = id;
        newAuthority.id = id.toHexString();
        return newAuthority;
    }

    return null;
}

export const update = async (id: string, name: string): Promise<Authority | null> => {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const filter = {
        _id: new ObjectId(id)
    };

    const connection = await getConnection;
    const authoritiesCollection = connection.db().collection<Authority>(COLLECTION_AUTHORITIES);
    const authority = await authoritiesCollection.findOne(filter) as Authority;

    if (authority) {
        await authoritiesCollection.updateOne(
            {
                _id: new ObjectId(id?.toString())
            },
            {
                $set: {
                    name,
                    updatedAt: new Date()
                }
            }
        );

        return await authoritiesCollection.findOne(filter);
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string): Promise<number> => {
    if (!ObjectId.isValid(id)) {
        return 0;
    }

    const filter = {
        _id: new ObjectId(id)
    };

    const connection = await getConnection;
    const authoritiesCollection = connection.db().collection<Authority>(COLLECTION_AUTHORITIES);
    const authority = await authoritiesCollection.findOne(filter) as Authority;

    if (authority) {
        const result = await authoritiesCollection.deleteOne({
            _id: new ObjectId(id)
        });

        return result.deletedCount;
    } else {
        return 0;
    }
}