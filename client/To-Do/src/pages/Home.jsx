import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (newTask === "") {
      setErrorMessage("Please enter a valid task");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/addtask/`,
          newTask
        );
        setSuccessMessage(response.data);
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

  useEffect(() => {
    const handleSuccess = () => {
      // console.log(successMessage);
      setTimeout(() => setSuccessMessage(""), 3000);
    };
    const handleError = () => {
      // console.log(errorMessage);
      setTimeout(() => setErrorMessage(""), 3000);
    };
    successMessage != "" && handleSuccess();
    errorMessage != "" && handleError();
  }, [successMessage, errorMessage]);

  const TaskRow = ({ id, task, createTime, modTime, pk }) => {
    const [updateTask, setUpdateTask] = useState(task);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = async (id) => {
      if (updateTask === "") {
        setErrorMessage("Please enter a valid task");
      } else {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/update${id}/`,
          updateTask
        );
        setSuccessMessage(res.data);
        handleuUpdateTask();
      }
      setIsEdit(!isEdit);
    };

    const handleDelete = async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/delete${id}/`
      );
      setSuccessMessage(res.data);
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
    <div className="mt-5 py-2 position-relative">
      <div className=" flex-row text-center py-1">
        <h1 className=" mt-5 text-primary">To Do List</h1>
      </div>
      <div className=" flex-row fs-5 fw-bold text-center top-0 mt-4 w-100 position-absolute z-9999">
        {(successMessage ? (
          <span className=" text-success">{successMessage} </span>
        ) : (
          ""
        )) ||
          (errorMessage ? (
            <span className=" text-danger">{errorMessage}</span>
          ) : (
            ""
          ))}
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
                  createTime={moment(item.created).format("MMM DD YYYY h:mm A")}
                  modTime={moment(item.modified).format("MMM DD YYYY h:mm A")}
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
