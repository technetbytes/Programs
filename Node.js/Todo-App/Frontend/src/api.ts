import axios from 'axios';
import { Todo, CreateTodoDto } from './types';

const api = axios.create({
  baseURL: '/api',
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todos');
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo: CreateTodoDto): Promise<Todo> => {
  const response = await api.post('/todos', todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
