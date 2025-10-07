import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FilterButton from "./components/FilterButton";
import TaskForm from "./components/TaskForm";
import { useEffect, useState } from "react";
import Stats from "./components/Stats";
import { fetchTaskApi } from "./api/taskApi.js";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const fetchtasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTaskApi();
      setTasks(data);
    } catch (err) {
      console.log("Error fetching", err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchtasks();
  }, []);
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
        <TaskList tasks={filteredTask} loading={loading} editingTask={editingTask} setEditingTask={setEditingTask} />
      </div>

      {/* Dark Full Screen Modal */}
      {/* Conditional Rendering */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center  z-50">
          <div className="w-full max-w-3xl px-8">
            {/* Task Form */}
            <TaskForm onCancel={() => setShowForm(!showForm)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
