import Header from "../components/Header";
import TaskList from "../components/TaskList";
import FilterButton from "../components/FilterButton";
import TaskForm from "../components/TaskForm";
import { useState } from "react";
import Stats from "../components/Stats";
import { useTasks } from "../hook/useTask.js";

const Home = () => {
  const { tasks, loading, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filteredTask = tasks.filter(task => {
    if (filter == "completed") return task.completed;
    if (filter == "pending") return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(item => item.completed).length,
    pending: tasks.filter(item => !item.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 ">
      <div className="max-w-3xl mx-auto">
        <Header />
        <Stats {...stats} />

        {/* add new task button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-900 transition cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Task
          </button>
        </div>

        <FilterButton filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTask}
          loading={loading}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      </div>

      {/* Dark Full Screen Modal */}
      {/* Conditional Rendering */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center  z-50">
          <div className="w-full max-w-3xl px-8">
            {/* Task Form */}
            <TaskForm
              onCancel={() => setShowForm(!showForm)}
              onCreate={() => {
                createTask(newTask);
                setNewTask({ title: "", description: "" });
                setShowForm(false);
              }}
              newTask={newTask}
              setNewTask={setNewTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
