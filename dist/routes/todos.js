"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = []; //
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res) => {
    const body = req.body; // Type assertion: This tells TypeScript that the body of the request will conform to the RequestBody type
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text // type casting: This ensures that the text property of the new todo is a string
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res) => {
    const body = req.body;
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[todoIndex].text = body.text;
    res.status(200).json({ message: 'Todo updated', todo: todos[todoIndex] });
});
router.delete('/todo/:todoId', (req, res) => {
    const params = req.params;
    const todoId = params.todoId;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).json({ message: 'Todo deleted', todos: todos });
});
exports.default = router;
