"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const errors_1 = require("./errors");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const validateTodoInput = (data) => {
    if (!data.title) {
        throw new errors_1.ApiError(400, 'Title is required');
    }
    if (data.title.length > 255) {
        throw new errors_1.ApiError(400, 'Title must be less than 255 characters');
    }
};
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
});
// Get all todos
app.get('/api/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pool.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(result.rows);
    }
    catch (error) {
        const { statusCode, message } = (0, errors_1.handleError)(error);
        res.status(statusCode).json({ error: message });
    }
}));
// Get a single todo
app.get('/api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            throw new errors_1.ApiError(400, 'Invalid ID format');
        }
        const result = yield db_1.pool.query('SELECT * FROM todos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new errors_1.ApiError(404, 'Todo not found');
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        const { statusCode, message } = (0, errors_1.handleError)(error);
        res.status(statusCode).json({ error: message });
    }
}));
// Create a todo
app.post('/api/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoData = req.body;
        validateTodoInput(todoData);
        const result = yield db_1.pool.query('INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *', [todoData.title, todoData.description]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        const { statusCode, message } = (0, errors_1.handleError)(error);
        res.status(statusCode).json({ error: message });
    }
}));
// Update a todo
app.put('/api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        if (!Number.isInteger(Number(id))) {
            throw new errors_1.ApiError(400, 'Invalid ID format');
        }
        if (title) {
            validateTodoInput({ title });
        }
        const result = yield db_1.pool.query('UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *', [title, description, completed, id]);
        if (result.rows.length === 0) {
            throw new errors_1.ApiError(404, 'Todo not found');
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        const { statusCode, message } = (0, errors_1.handleError)(error);
        res.status(statusCode).json({ error: message });
    }
}));
// Delete a todo
app.delete('/api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            throw new errors_1.ApiError(400, 'Invalid ID format');
        }
        const result = yield db_1.pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new errors_1.ApiError(404, 'Todo not found');
        }
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        const { statusCode, message } = (0, errors_1.handleError)(error);
        res.status(statusCode).json({ error: message });
    }
}));
// Graceful shutdown
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.end();
        console.log('Database pool has ended');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
// Start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDatabase();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
