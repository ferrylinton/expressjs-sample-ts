import { NextFunction, Request, Response } from 'express';
import * as todoService from '../services/todo-service';

export async function find(req: Request, res: Response, next: NextFunction) {
    try {
        const todoDocuments = await todoService.find()
        res.status(200).send(todoDocuments);
    } catch (error) {
        next(error);
    }
};

export async function findById(req: Request, res: Response, next: NextFunction) {
    try {
        const todoDocument = await todoService.findById(req.params.id)

        if (todoDocument) {
            res.status(200).json(todoDocument);
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
        const todoDocument = await todoService.save(task)
        res.status(201).json(todoDocument);
    } catch (error) {
        next(error);
    }
};

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const todoDocument = await todoService.update(req.params.id, req.body)

        if (todoDocument) {
            res.status(200).json(todoDocument);
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

    } catch (error) {
        next(error);
    }
};

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await todoService.deleteById(req.params.id);

        if (result) {
            res.status(200).json({ message: 'Data is deleted' });
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

    } catch (error) {
        next(error);
    }
};