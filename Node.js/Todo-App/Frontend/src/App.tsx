import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import { Todo, CreateTodoDto } from './types';
import * as api from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todo: CreateTodoDto) => {
    try {
      const newTodo = await api.createTodo(todo);
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setError(null);
      setIsModalOpen(false); // Close modal after successful creation
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await api.updateTodo(id, { completed });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl animate-fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Stay organized, boost productivity</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8 animate-fadeIn" role="alert">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Task
            </button>
          </div>
        
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Your Tasks ({todos.length})
                </h2>
                <div className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {todos.filter(t => t.completed).length} completed
                </div>
              </div>
              <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
              {todos.length === 0 && (
                <div className="text-center py-12 animate-fadeIn">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-4 text-gray-500">No tasks yet. Click "Add New Task" to create your first task!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <TodoForm onSubmit={handleCreateTodo} />
      </Modal>
    </div>
  );
};

export default App;
