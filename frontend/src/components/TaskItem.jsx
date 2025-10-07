import React from "react";
import { Check, Edit2, Trash2 } from "lucide-react";
import EditTaskForm from "./EditTaskForm";
const TaskItem = ({ task, editingTask, setEditingTask }) => {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition duration-200 hover:shadow-xl hover:border-gray-600 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      {/* Condition rendering */}
      {editingTask == task._id ? (
        <EditTaskForm />
      ) : (
        <div className="flex items-center justify-between ">
          {/* Left  side check box + detail */}
          <div className="flex items-start space-x-3 flex-1">
            {/* Toggle completetion */}
            <button className="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition duration-200">
              {task.completed && <Check size={16} />}
            </button>

            {/* Task info */}
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${task.completed ? "text-gray-400" : "text-white"}`}>{task.title}</h3>
              {task.description && (
                <p className={`mt-1 ${task.completed ? "text-gray-400" : "text-white"}`}>{task.description}</p>
              )}
              {/* Created & Updated Timestamps */}
              <p className="text-sm text-gray-500 mt-2">
                {" "}
                Created: {new Date(task.createAt).toLocaleDateString()}
                {task.updateAt !== task.createAt && (
                  <span> Updated: {new Date(task.updateAt).toLocaleDateString()}</span>
                )}
              </p>
            </div>
          </div>

          {/* RightSide ACtions */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Edit Button */}
            <button
              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition duration-200 cursor-pointer"
              onClick={() => setEditingTask(task.id)}
            >
              <Edit2 size={18} />
            </button>
            {/* Delete Button */}
            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition duration-200 cursor-pointer">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Else*/}
    </div>
  );
};

export default TaskItem;
