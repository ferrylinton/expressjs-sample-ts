const todos: Todo[] = [
    { id: "111111", task: "test 1", isDone: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "222222", task: "test 2", isDone: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "333333", task: "test 3", isDone: true, createdAt: new Date(), updatedAt: new Date() }
];

const MAX_SIZE = 10;

export function find() {
    return todos;
}

export function findById(id: string): Todo | null {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        return todos[index];
    } else {
        return null;
    }
}

export function setDone(id: string): Todo | null {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos[index].isDone = true;
        todos[index].updatedAt = new Date();
        return todos[index];
    } else {
        return null;
    }
}

export function create(task: string): Todo | null {
    if (todos.length === MAX_SIZE) {
        todos.shift();
    }

    const todo: Todo = { id:randomId(),  task, isDone: false, createdAt: new Date(), updatedAt: new Date() }
    todos.push(todo);

    return todo;
}

export function deleteById(id: string) {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        return id;
    } else {
        return null;
    }
}

const randomId = function (length = 6) {
    return Math.random().toString(36).substring(2, length + 2);
};