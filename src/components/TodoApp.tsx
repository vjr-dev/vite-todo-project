import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";

const STORAGE_KEY = "todos";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  // Load initial todos from localStorage or API
  useEffect(() => {
    const loadTodos = async () => {
      try {
        // First try to get todos from localStorage
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
          setLoading(false);
          return;
        }

        // If no todos in localStorage, fetch from API
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();

        // Ensure todos have unique IDs
        const todosWithUniqueIds = data.todos.map(
          (todo: Todo, index: number) => ({
            ...todo,
            id: Date.now() + index, // Ensure unique IDs by adding index
          })
        );

        setTodos(todosWithUniqueIds);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todosWithUniqueIds));
      } catch (error) {
        console.error("Error loading todos:", error);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loading]);

  // Generate a unique ID for new todos
  const generateUniqueId = () => {
    const existingIds = new Set(todos.map((todo) => todo.id));
    let newId = Date.now();

    // In the unlikely case of ID collision, increment until we find a unique ID
    while (existingIds.has(newId)) {
      newId++;
    }

    return newId;
  };

  const addTodo = async (text: string) => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1,
        }),
      });
      const newTodo = await response.json();
      // Ensure the new todo has a unique ID
      const uniqueNewTodo = {
        ...newTodo,
        id: generateUniqueId(),
      };
      const updatedTodos = [...todos, uniqueNewTodo];
      setTodos(updatedTodos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error adding todo:", error);
      // Fallback to optimistic update if API fails
      const newTodo: Todo = {
        id: generateUniqueId(),
        todo: text,
        completed: false,
        userId: 1,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Todo App
        </h1>
        <AddTodo onAdd={addTodo} />
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default TodoApp;
