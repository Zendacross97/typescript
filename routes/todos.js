"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[todoIndex].text = req.body.text;
    res.status(200).json({ message: 'Todo updated', todo: todos[todoIndex] });
});
router.delete('/todo/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).json({ message: 'Todo deleted', todos: todos });
});
exports.default = router;
