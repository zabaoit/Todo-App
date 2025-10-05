import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FilterButton from "./components/FilterButton";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 ">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* add new task button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-900 transition cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Task
          </button>
        </div>

        <FilterButton />
        <TaskList />
      </div>

      {/* Dark Full Screen Modal */}
      {/* Conditional Rendering */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[10px] flex items-center justify-center  z-50">
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
