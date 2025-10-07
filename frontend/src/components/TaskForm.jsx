import { Plus, X } from "lucide-react";
import React from "react";

const TaskForm = ({ onCancel, onCreate, newTask, setNewTask }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Task</h2>

        {/* Conditional Rendering */}
        {onCancel && (
          <button className="text -gray-400 hover:text-red-500 transition cursor-pointer" onClick={onCancel}>
            <X size={26} />
          </button>
        )}
      </div>

      {/* Input */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task Title......"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={4}
        ></textarea>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCreate}
            className="flex-1 bg bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-green-500 hover:to-emerald-500 transition cursor-pointer"
          >
            <Plus size={20} /> Add Task
          </button>

          {/* Conditional Rendering */}
          <button
            className="flex-1 bg-gray-500 text-gray-300 py-3 rounded-lg hover:bg-gray-600 transition cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
