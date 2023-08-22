type Todo = {
    task: string,
    done: boolean,
    createdAt: Date,
    updatedAt: Date
}

type TodoUpdate = {
    task?: string,
    done?: boolean
}

