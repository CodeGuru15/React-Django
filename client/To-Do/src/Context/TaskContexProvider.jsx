import { useState, useEffect } from "react";
import TaskContex from "./TaskContext";
import axios from "axios";

const TaskContexProvider = ({ children }) => {
  const [allTask, setAllTask] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/`
      );
      setAllTask(res.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContex.Provider
      value={{
        fetchTasks,
        allTask,
        setAllTask,
        loading,
        setLoading,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TaskContex.Provider>
  );
};

export default TaskContexProvider;
