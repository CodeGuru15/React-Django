import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import Loader from "../components/Loader";
import TaskContex from "../Context/TaskContext";

const Home = () => {
  const {
    allTask,
    fetchTasks,
    loading,
    setLoading,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    setSearchText,
    isSeached,
    setIsSearched,
  } = useContext(TaskContex);
  const [newTask, setNewTask] = useState("");

  const handleuUpdateTask = async () => {
    await fetchTasks();
  };

  const handleSubmit = async () => {
    if (newTask === "") {
      setErrorMessage("Please enter a valid task");
    } else {
      if (newTask.length < 3) {
        setErrorMessage("Please enter minimum 3 characters");
      } else {
        setLoading(true);
        setIsSearched(false);
        setSearchText("");
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/addtask/`,
            newTask
          );
          setSuccessMessage(response.data);
          handleuUpdateTask();
        } catch (error) {
          setErrorMessage("Something went wrong. Please try again!");
          console.error(error);
        }
        setNewTask("");
      }
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  useEffect(() => {
    const handleSuccess = () => {
      setTimeout(() => setSuccessMessage(""), 3000);
    };
    const handleError = () => {
      setTimeout(() => setErrorMessage(""), 3000);
    };
    successMessage != "" && handleSuccess();
    errorMessage != "" && handleError();
  }, [successMessage, errorMessage]);

  const TaskRow = ({ id, task, createTime, modTime, pk }) => {
    const [updateTask, setUpdateTask] = useState(task);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleUpdate = async (id) => {
      if (updateTask === "") {
        setErrorMessage("Please enter a valid task");
      } else {
        setLoading(true);
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/update${id}/`,
          updateTask
        );
        setSuccessMessage(res.data);
        handleuUpdateTask();
        setIsSearched(false);
        setSearchText("");
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
      setIsSearched(false);
      setSearchText("");
    };

    return (
      <tr className=" ">
        <td scope="row" className="text-center">
          {id}
        </td>
        <td className=" px-2">
          {isEdit ? (
            <input
              className=" px-1 w-75"
              type="text"
              onChange={(e) => setUpdateTask(e.target.value)}
              value={updateTask}
            />
          ) : (
            task
          )}
        </td>
        <td className="">{createTime}</td>
        <td className="">{modTime}</td>
        {isEdit ? (
          <td className=" position-absolute">
            <div
              role="button"
              onClick={() => {
                setIsEdit(false);
                setUpdateTask(task);
              }}
            >
              Cancel
            </div>
            <div role="button" onClick={() => handleUpdate(pk)}>
              Update
            </div>
          </td>
        ) : (
          <td
            role="button"
            onClick={() => {
              setIsEdit(true);
            }}
            className=" text-success border-0 "
          >
            <MdEdit />
          </td>
        )}

        {isDelete ? (
          <td className=" position-absolute d-flex gap-3">
            <div role="button" onClick={() => setIsDelete(false)}>
              Cancel
            </div>
            <div role="button" onClick={() => handleDelete(pk)}>
              Delete
            </div>
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
      <div className=" flex-row fs-5 text-center top-0 mt-4 w-100 position-absolute z-9999">
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
            placeholder="Add New Task"
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
      {isSeached ? (
        <Button
          variant="outline-primary"
          onClick={() => {
            setIsSearched(false);
            setSearchText("");
            fetchTasks();
          }}
          className=""
        >
          Clear Search
        </Button>
      ) : null}
      {!loading ? (
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
                    createTime={moment(item.created).format(
                      "MMM DD YYYY h:mm A"
                    )}
                    modTime={moment(item.modified).format("MMM DD YYYY h:mm A")}
                    pk={item.id}
                  />
                );
              })}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
