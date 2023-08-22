import { isObjectIdOrHexString } from "mongoose";
import connect from "../configs/mongodb";
import AuthorityModel from "../models/authority-model";
import { Authority, AuthorityDocumentType } from "../types/authority-type";

export const find = async (): Promise<Authority[]> => {
    await connect;
    
    const authorities: Array<AuthorityDocumentType> = await AuthorityModel.find();
    return authorities.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findById = async (id: string): Promise<Authority | null> => {
    await connect;

    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    const authorityDoc = await AuthorityModel.findById(id);

    if (authorityDoc) {
        return JSON.parse(JSON.stringify(authorityDoc.toJSON()));
    } else {
        return null;
    }
}

export const save = async (name: string): Promise<AuthorityDocumentType> => {
    await connect;
    const authority = await AuthorityModel.create({ name });

    return authority;
}

export const update = async (id: string, name: string): Promise<AuthorityDocumentType | null> => {
    await connect;
    const authority = await AuthorityModel.findById(id);

    if (authority) {
        authority.name = name;
        return await authority.save();
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<AuthorityDocumentType | null> => {
    return await AuthorityModel.findByIdAndRemove(id);
}