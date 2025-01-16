import React from "react";
import { Trash2 } from "lucide-react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <span
          className={`${todo.completed ? "line-through text-gray-500" : ""}`}
        >
          {todo.todo}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-white-500 hover:text-white-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default TodoItem;
