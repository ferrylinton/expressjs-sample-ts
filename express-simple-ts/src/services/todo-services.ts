const todos: Todo[] = [
    { task: "test 1", isDone: false, createdAt: new Date(), updatedAt: new Date() },
    { task: "test 2", isDone: false, createdAt: new Date(), updatedAt: new Date() },
    { task: "test 3", isDone: true, createdAt: new Date(), updatedAt: new Date() }
];

const MAX_SIZE = 10;

export function find() {
    return todos.map((todo, index) => {
        const id = index + 1;
        return {
            id, ...todo
        }
    });
}

export function findById(id: number): Todo | null {
    if (id >= 0 && id < todos.length) {
        return { id, ...todos[id - 1] };
    } else {
        return null;
    }
}

export function setDone(id: number): Todo | null {
    if (id >= 0 && id < todos.length) {
        todos[id - 1].isDone = true;
        todos[id - 1].updatedAt = new Date();
        return { id, ...todos[id - 1] };
    } else {
        return null;
    }
}

export function create(task: string): Todo | null {
    if (todos.length === MAX_SIZE) {
        todos.pop();
    }

    const id = todos.length + 1;
    const todo: Todo = { task, isDone: false, createdAt: new Date(), updatedAt: new Date() }
    todos.push(todo);

    return { id, ...todo };
}

export function deleteById(id: number) {
    if (id >= 0 && id < todos.length) {
        const index = id - 1;
        todos.splice(index, 1);
        return id
    } else {
        return null;
    }
}