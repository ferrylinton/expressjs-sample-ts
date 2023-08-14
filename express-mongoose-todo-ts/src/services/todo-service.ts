import { isObjectIdOrHexString } from "mongoose";
import TodoModel from "../models/todo-model";

export const find = async (): Promise<Todo[]> => {
    return await TodoModel.find().lean();
}

export const findById = async (id: string): Promise<Todo | null> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    return await TodoModel.findById({ _id: id }).lean();
}

export const save = async (task: string): Promise<Todo> => {
    const todoDocument = await TodoModel.create({ task });
    return todoDocument.toJSON()
}

export const update = async (id: string, todoUpdate: TodoUpdate): Promise<Todo | null> => {
    const todoDocument = await TodoModel.findById(id);

    if (todoDocument) {
        if (todoUpdate.task) {
            todoDocument.task = todoUpdate.task;
        }

        if (todoUpdate.done) {
            todoDocument.done = todoUpdate.done;
        }

        todoDocument.updatedAt = new Date();
        return await todoDocument.save();
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<Todo | null> => {
    return await TodoModel.findByIdAndRemove(id).lean();
}