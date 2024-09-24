import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [counter, setCounter] = useState(0);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/`
      );
      setAllTask(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleuUpdateTask = async () => {
    await fetchTasks();
  };

  useEffect(() => {
    setCounter(counter + 1);
    fetchTasks();
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
        handleuUpdateTask();
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

  const TaskRow = ({ id, task, createTime, modTime, pk }) => {
    const [updateTask, setUpdateTask] = useState(task);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = async (id) => {
      if (updateTask === "") {
        alert("Please enter a valid task");
      } else {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/update${id}/`,
          updateTask
        );
        alert(res.data);
        handleuUpdateTask();
      }
      setIsEdit(!isEdit);
    };

    const handleDelete = async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/delete${id}/`
      );
      alert(res.data);
      handleuUpdateTask();
      setIsDelete(false);
    };
    return (
      <tr className=" text-center">
        <th scope="row">{id}</th>
        <td>
          {isEdit ? (
            <input
              className=" px-2 w-50"
              type="text"
              onChange={(e) => setUpdateTask(e.target.value)}
              value={updateTask}
            />
          ) : (
            task
          )}
        </td>
        <td>{createTime}</td>
        <td>{modTime}</td>
        {isEdit ? (
          <td className=" position-absolute d-flex gap-3">
            <span
              role="button"
              onClick={() => {
                setIsEdit(false);
                setUpdateTask(task);
              }}
            >
              Cancel
            </span>
            <span role="button" onClick={() => handleEdit(pk)}>
              Update
            </span>
          </td>
        ) : (
          <td
            role="button"
            onClick={() => setIsEdit(true)}
            className=" text-success border-0 "
          >
            <MdEdit />
          </td>
        )}

        {isDelete ? (
          <td className=" position-absolute d-flex gap-3">
            <span role="button" onClick={() => setIsDelete(false)}>
              Cancel
            </span>
            <span role="button" onClick={() => handleDelete(pk)}>
              Delete
            </span>
          </td>
        ) : (
          <td
            role="button"
            onClick={() => setIsDelete(true)}
            className=" text-danger border-0"
          >
            <MdDelete />
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="mt-5 py-2">
      <div className=" flex-row text-center py-1">
        <h1 className=" mt-5 text-primary">All Tasks</h1>
      </div>
      <div>
        Counter <span>{counter}</span>
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
                  pk={item.id}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
