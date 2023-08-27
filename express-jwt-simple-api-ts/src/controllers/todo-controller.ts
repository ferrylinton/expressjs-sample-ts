import { Request, Response } from 'express';
import * as todoService from '../services/todo-service';


export function find(req: Request, res: Response) {
    res.status(200).json(todoService.find());
};

export function findById(req: Request, res: Response) {
    const id = req.params.id as string;
    const todo = todoService.findById(id);

    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'not found' });
    }
};

export function create(req: Request, res: Response) {
    res.status(201).json(todoService.create(req.body.task));
};

export function update(req: Request, res: Response) {
    const id = req.params.id as string;
    const todo = todoService.findById(id);

    if (todo) {
        res.status(200).json(todoService.setDone(id));
    } else {
        res.status(404).json({ message: 'not found' });
    }
};

export function deleteById(req: Request, res: Response) {
    const id = req.params.id as string;
    const todo = todoService.deleteById(id);

    if (todo) {
        res.status(200).json({ message: 'data is deleted' });
    } else {
        res.status(404).json({ message: 'not found' });
    }
};