import { useEffect, useState } from "react";
import { createTaskApi, deleteTaskApi, fetchTaskApi, toggleTaskApi, updateTaskApi } from "../api/taskApi.js";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const createTask = async task => {
    if (!task || !task.title || !task.title.trim()) return;

    try {
      const data = await createTaskApi(task);
      setTasks(prev => [data, ...prev]);
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updated = await updateTaskApi(id, updates);
      setTasks(tasks.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const deleteTask = async id => {
    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const toggleTask = async id => {
    try {
      const updated = await toggleTaskApi(id);
      setTasks(tasks.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchtasks,
  };
};

export { useTasks };
