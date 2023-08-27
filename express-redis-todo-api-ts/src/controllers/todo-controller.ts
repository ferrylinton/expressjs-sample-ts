import { NextFunction, Request, Response } from 'express';
import { DATA_IS_DELETED, DATA_IS_NOT_FOUND, DATA_IS_UPDATED } from '../configs/message-constant';
import * as todoService from '../services/todo-service';


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

        const todo = await todoService.findById(id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: DATA_IS_NOT_FOUND });
        }
    } catch (error) {
        next(error);
    }
};

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { task } = req.body;
        const todo = await todoService.create(task);

        if(todo){
            res.status(201).json(todo);
        }else{
            res.status(400).json({message: 'Can not create data, max data 20 items'});
        }
        
    } catch (error) {
        next(error);
    }
};

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const result = await todoService.update(id, req.body);
        result
            ? res.status(200).json({ message: DATA_IS_UPDATED })
            : res.status(404).json({ message: DATA_IS_NOT_FOUND });

    } catch (error) {
        next(error);
    }
};

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const result = await todoService.deleteById(id);

        if (result) {
            res.status(200).json({ message: DATA_IS_DELETED });
        } else {
            res.status(404).json({ message: DATA_IS_NOT_FOUND });
        }
    } catch (error) {
        next(error);
    }
};