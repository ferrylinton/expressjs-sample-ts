import { NextFunction, Request, Response } from 'express';
import * as authorityService from '../services/authority-service';

export async function find(req: Request, res: Response, next: NextFunction) {
    try {
        const authorities = await authorityService.find()
        res.status(200).send(authorities);
    } catch (error) {
        next(error);
    }
};

export async function findById(req: Request, res: Response, next: NextFunction) {
    try {
        const authority = await authorityService.findById(req.params.id)

        if (authority) {
            res.status(200).json(authority);
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

    } catch (error) {
        next(error);
    }
};

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const authority = await authorityService.save(name)
        res.status(201).json(authority);
    } catch (error) {
        next(error);
    }
};

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const authority = await authorityService.update(req.params.id, name)

        if (authority) {
            res.status(200).json(authority);
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

    } catch (error) {
        next(error);
    }
};

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authorityService.deleteById(req.params.id);

        if (result) {
            res.status(200).json({ message: 'Data is deleted' });
        } else {
            res.status(404).json({ message: 'Data is not found' });
        }

    } catch (error) {
        next(error);
    }
};