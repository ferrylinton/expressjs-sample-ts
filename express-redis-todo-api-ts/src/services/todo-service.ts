import { destr } from "destr";
import serialize from 'serialize-javascript';
import { v4 as uuidv4 } from 'uuid';
import redisClient from "../configs/redis";

const PX = 5 * 60 * 1000; // 5 minutes

export const find = async () => {
    const keys = await redisClient.KEYS('todo:*');
    const todoes = [];

    for (let i = 0; i < keys.length; i++) {
        const todoText = await redisClient.GET(keys[i]) as string;
        const todo = destr<Todo>(todoText);
        todoes.push(todo);
    }
    return todoes;
}

export const findById = async (id: string) => {
    const todoText = await redisClient.GET(`todo:${id}`);
    return destr(todoText);
}

export const create = async (task: string) => {
    const id = uuidv4();
    const now = new Date().toISOString();
    const todo: Todo = {
        id,
        task,
        done: false,
        createdAt: now,
        updatedAt: now
    };

    const keys = await redisClient.KEYS('todo:*');

    if (keys.length < 20) {
        const result = await redisClient.SET(`todo:${id}`, serialize(todo), {
            PX,
            NX: true
        });

        if (result === 'OK') {
            return todo;
        } else {
            return null;
        }
    }

    return null;
}

export const update = async (id: string, todoUpdate: TodoUpdate) => {
    const todoText = await redisClient.GET(id);

    if (todoText) {
        const todo = destr<Todo>(todoText);

        if (todoUpdate.task) {
            todo.task = todoUpdate.task;
        }

        if (todoUpdate.done) {
            todo.done = todoUpdate.done;
        }

        return await redisClient.SET(`todo:${id}`, serialize(todo), {
            PX,
            XX: true
        });
    }

}

export const deleteById = async (id: string) => {
    return await redisClient.DEL(id);
}
