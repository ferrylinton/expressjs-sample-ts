import { ObjectId } from "mongodb";
import { getCollection } from "../configs/mongodb";

export const find = async (): Promise<Todo[]> => {
    const todoes: Todo[] = [];
    const todoesCollection = await getCollection<Todo>('todoes');
    const cursor = todoesCollection.find();

    for await (const doc of cursor) {
        const { _id, ...other } = doc;
        const id = _id.toHexString();
        todoes.push({ id, ...other });
    }

    return todoes;
}

export const findById = async (_id: ObjectId) => {
    const todoesCollection = await getCollection<Todo>('todoes');
    return await todoesCollection.findOne({_id});
}

export const save = async (task: string) => {
    const todoesCollection = await getCollection<Todo>('todoes');
    const now = new Date();
    const data: Todo = {
        task,
        done: false,
        createdAt: now,
        updatedAt: now
    }
    return await todoesCollection.insertOne(data);
}

export const update = async (_id: ObjectId, todoUpdate: TodoUpdate) => {
    const todoesCollection = await getCollection<Todo>('todoes');

    const data: Partial<Todo> = {
        updatedAt: new Date()
    }

    if (todoUpdate.task) {
        data.task = todoUpdate.task;
    }

    if (todoUpdate.done) {
        data.done = todoUpdate.done;
    }

    return await todoesCollection.updateOne({ _id }, { $set: data });
}

export const deleteById = async (_id: ObjectId) => {
    const todoesCollection = await getCollection<Todo>('todoes');
    return await todoesCollection.deleteOne({ _id });
}