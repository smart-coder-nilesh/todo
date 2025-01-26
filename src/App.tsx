import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash2, Edit2, X, Save } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  isEditing?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      }]);
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

  const startEditing = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  const cancelEditing = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: false } : todo
    ));
  };

  const saveTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  const groupTodosByDate = () => {
    const groups: { [key: string]: Todo[] } = {};
    todos.forEach(todo => {
      const date = new Date(todo.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(todo);
    });
    return groups;
  };

  const TodoItem = ({ todo }: { todo: Todo }) => {
    const [editText, setEditText] = useState(todo.text);

    return (
      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors duration-200">
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
        
        {todo.isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <button
              onClick={() => saveTodo(todo.id, editText)}
              className="text-green-500 hover:text-green-600"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => cancelEditing(todo.id)}
              className="text-red-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            <span className={`flex-1 text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
              <button
                onClick={() => startEditing(todo.id)}
                className="text-gray-400 hover:text-blue-500"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const groupedTodos = groupTodosByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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

          <div className="space-y-6">
            {Object.entries(groupedTodos).map(([date, todosForDate]) => (
              <div key={date} className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  {date === new Date().toLocaleDateString() ? 'Today' : date}
                </h2>
                {todosForDate.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
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