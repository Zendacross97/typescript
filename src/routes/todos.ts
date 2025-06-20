import {Router, Request, Response} from "express";

import { Todo } from "../models/todo"; // Importing the Todo interface from models/todo.ts as a named import

let todos: Todo[] = [];//

const router = Router();

type RequestBody = { // type alias: This type defines the structure of the request body for creating a new todo
    text: string;
};

type RequestParams = { // type alias: This type defines the structure of the request parameters for updating or deleting a todo
    todoId: string;
};

router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req: Request, res: Response) => {
    const body = req.body as RequestBody;// Type assertion: This tells TypeScript that the body of the request will conform to the RequestBody type
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text// type casting: This ensures that the text property of the new todo is a string
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req: Request, res: Response): any => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[todoIndex].text = body.text;
    res.status(200).json({ message: 'Todo updated', todo: todos[todoIndex] });
});

router.delete('/todo/:todoId', (req: Request, res: Response) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).json({ message: 'Todo deleted', todos: todos });
});

export default router;