import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Todo List
          </h1>
          
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </form>

          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle className="text-purple-500" size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span
                  className={`flex-1 text-gray-800 ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No todos yet. Add some tasks above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;