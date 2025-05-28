import express, { Request, Response } from 'express';
import cors from 'cors';
import { pool } from './db';
import { Todo, CreateTodoDto } from './types';
import { ApiError, handleError } from './errors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const validateTodoInput = (data: Partial<CreateTodoDto>) => {
  if (!data.title) {
    throw new ApiError(400, 'Title is required');
  }
  if (data.title.length > 255) {
    throw new ApiError(400, 'Title must be less than 255 characters');
  }
};

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

// Get all todos
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ error: message });
  }
});

// Get a single todo
app.get('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      throw new ApiError(400, 'Invalid ID format');
    }
    
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Todo not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ error: message });
  }
});

// Create a todo
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const todoData: CreateTodoDto = req.body;
    validateTodoInput(todoData);
    
    const result = await pool.query(
      'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
      [todoData.title, todoData.description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ error: message });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!Number.isInteger(Number(id))) {
      throw new ApiError(400, 'Invalid ID format');
    }
    
    // Get the current todo first
    const currentTodo = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (currentTodo.rows.length === 0) {
      throw new ApiError(404, 'Todo not found');
    }
    
    const todo = currentTodo.rows[0];
    const updatedTodo = {
      title: updates.title ?? todo.title,
      description: updates.description ?? todo.description,
      completed: updates.completed ?? todo.completed
    };
    
    if (updates.title) {
      validateTodoInput({ title: updates.title });
    }
    
    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [updatedTodo.title, updatedTodo.description, updatedTodo.completed, id]
    );
    
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Todo not found');
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ error: message });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!Number.isInteger(Number(id))) {
      throw new ApiError(400, 'Invalid ID format');
    }
    
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Todo not found');
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ error: message });
  }
});

// Graceful shutdown
const shutdown = async () => {
  try {
    await pool.end();
    console.log('Database pool has ended');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start the server
const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
