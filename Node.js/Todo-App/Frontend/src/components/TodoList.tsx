import React from 'react';
import { Todo } from '../types';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No todos yet. Add one above!
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
            todo.completed ? 'bg-opacity-75 border-l-4 border-green-500' : 'border-l-4 border-blue-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h3 className={`text-xl font-semibold mb-2 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-2 text-gray-600 leading-relaxed ${todo.completed ? 'line-through opacity-75' : ''}`}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(todo.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => onToggle(todo.id, !todo.completed)}
                className={`p-2 rounded-full hover:bg-gray-50 transition-all duration-200 group ${
                  todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                }`}
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <CheckCircleIcon className="h-7 w-7 transform group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                title="Delete todo"
              >
                <TrashIcon className="h-7 w-7 transform group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
