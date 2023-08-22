import { Request, Response } from 'express';


export function find(req: Request, res: Response) {
    const method = req.method;
    const keyword = (req.query.keyword || '') as string;
    const page = (req.query.page || '1') as string;

    res.status(200).json({ method, keyword, page });
};

export function findById(req: Request, res: Response) {
    const method = req.method;
    const id = req.params.id as string;

    res.status(200).json({ method, id });
};

export function create(req: Request, res: Response) {
    const method = req.method;
    const body = req.body;

    res.status(201).json({ method, body });
};

export function update(req: Request, res: Response) {
    const method = req.method;
    const id = req.params.id as string;
    const body = req.body;

    res.status(200).json({ method, id, body });
};

export function deleteById(req: Request, res: Response) {
    const method = req.method;
    const id = req.params.id as string;

    res.status(200).json({ method, id });
};