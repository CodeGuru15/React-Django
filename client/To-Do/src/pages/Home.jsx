import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [allTask, setAllTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/`
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasks = async () => {
    console.log("tasks fetched");
    const taskData = await fetchTasks();
    setAllTask(taskData);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async () => {
    if (newTask === "") {
      alert("Please enter a valid task");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/addtask/`,
          newTask
        );
        alert(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    setNewTask("");
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const TaskRow = ({ id, task, createTime, modTime }) => {
    const [updateTask, setUpdateTask] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = () => {
      setIsEdit(!isEdit);
    };

    const handleDelete = () => {
      setIsDelete(!isDelete);
    };
    return (
      <tr className=" text-center">
        <th scope="row">{id}</th>
        <td>{task}</td>
        <td>{createTime}</td>
        <td>{modTime}</td>
        <button
          type="button"
          onClick={handleEdit}
          className=" text-success border-0 "
        >
          <MdEdit />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className=" text-danger border-0"
        >
          <MdDelete />
        </button>
      </tr>
    );
  };

  return (
    <div className="mt-5 py-2">
      <div className=" flex-row text-center py-1">
        <h1 className=" mt-5 text-primary">All Tasks</h1>
      </div>
      <div className=" my-2 row">
        <div className=" col my-auto">
          <input
            type="text"
            placeholder="Your task"
            onChange={handleChange}
            value={newTask}
            className=" p-1 text-center mx-auto d-flex"
          />
        </div>
        <div className=" col">
          <Button
            type="submit"
            variant="outline-primary"
            onClick={handleSubmit}
            className="d-flex mx-auto"
          >
            Submit
          </Button>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr className=" text-center">
            <th scope="col">SL.</th>
            <th scope="col">Task</th>
            <th scope="col">Created</th>
            <th scope="col">Modified</th>
          </tr>
        </thead>
        <tbody>
          {allTask.length > 0 &&
            allTask.map((item, index) => {
              return (
                <TaskRow
                  key={index}
                  id={index + 1}
                  task={item.details}
                  createTime={item.created}
                  modTime={item.modified}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
