import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, loading, editingTask, setEditingTask }) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p>Loading tasks</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg">No task found, try addine one!</div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {tasks.map(task => {
        return <TaskItem key={task._id} task={task} editingTask={editingTask} setEditingTask={setEditingTask} />;
      })}
    </div>
  );
};

export default TaskList;
