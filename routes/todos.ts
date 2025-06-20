import {Router, Request, Response} from "express";

import { Todo } from "../models/todo"; // Importing the Todo interface from models/todo.ts as a named import

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req: Request, res: Response) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req: Request, res: Response): any => {
    const todoId = req.params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[todoIndex].text = req.body.text;
    res.status(200).json({ message: 'Todo updated', todo: todos[todoIndex] });
});

router.delete('/todo/:todoId', (req: Request, res: Response) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).json({ message: 'Todo deleted', todos: todos });
});

export default router;