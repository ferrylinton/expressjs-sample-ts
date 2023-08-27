type Todo = {
    id?: string,
    task: string,
    done: boolean,
    createdAt: Date | string,
    updatedAt: Date | string
}

type TodoUpdate = {
    task?: string,
    done?: boolean
}