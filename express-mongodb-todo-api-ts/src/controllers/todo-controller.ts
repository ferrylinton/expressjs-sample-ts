import { NextFunction, Request, Response } from 'express';
import * as todoService from '../services/todo-service';
import { ObjectId } from 'mongodb';


export async function find(req: Request, res: Response, next: NextFunction) {
    try {
        const todoes = await todoService.find()
        res.status(200).send(todoes);
    } catch (error) {
        next(error);
    }
};

export async function findById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        if (ObjectId.isValid(id)) {
            const todo = await todoService.findById(new ObjectId(id));
            if (todo) {
                const { _id, ...other } = todo;
                res.status(200).json({ id, ...other });
            } else {
                res.status(404).json({ message: 'Data is not found' });
            }
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }
    } catch (error) {
        next(error);
    }
};

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { task } = req.body;
        const result = await todoService.save(task);

        result
            ? res.status(201).send({ message: `Data is created with id ${result.insertedId}` })
            : res.status(500).send({ message: "Failed to create a new data" });
    } catch (error) {
        next(error);
    }
};

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(404).json({ message: 'Data is not found' });
        } else {
            const { modifiedCount } = await todoService.update(new ObjectId(id), req.body);
            modifiedCount
                ? res.status(200).send({ message: `Data is updated` })
                : res.status(404).send({ message: `Data is not found` });
        }

    } catch (error) {
        next(error);
    }
};

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(404).json({ message: 'Data is not found' });
        } else {
            const result = await todoService.deleteById(new ObjectId(id));

            if (result && result.deletedCount) {
                res.status(200).json({ message: 'Data is deleted' });
            } else if (!result) {
                res.status(400).json({ message: 'Failed to delete data' });
            } else if (!result.deletedCount) {
                res.status(404).json({ message: 'Data is not found' });
            }
        }
    } catch (error) {
        next(error);
    }
};