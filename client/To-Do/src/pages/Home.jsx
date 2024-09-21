import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  // console.log(allTask);

  return (
    <Container className="mt-5">
      <Row className="">
        <Col className="text-center">
          <h1 className=" mt-5 text-primary">All Tasks</h1>
        </Col>
      </Row>
      <Row className=" my-2">
        <Col>
          <input
            type="text"
            placeholder="Your task"
            onChange={handleChange}
            value={newTask}
            className=" p-1 text-center"
          />
        </Col>
        <Col>
          <Button
            type="submit"
            variant="outline-primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Row className="">
        <Col className=" border text-center">
          <p className=" my-2 fs-6">SL</p>
        </Col>
        <Col className=" border text-center">
          <p className=" my-2 fs-6">Details</p>
        </Col>
        <Col className=" border text-center">
          <p className=" my-2 fs-6">Created</p>
        </Col>
        <Col className=" border text-center">
          <p className=" my-2 fs-6">Modified</p>
        </Col>
      </Row>
      {allTask.length > 0 &&
        allTask.map((item, index) => {
          return (
            <Row className="" key={index}>
              <Col className=" border text-center">
                <p className=" my-2 fs-6">{index + 1}</p>
              </Col>
              <Col className=" border text-center">
                <p className=" my-2 fs-6">{item.details}</p>
              </Col>
              <Col className=" border text-center">
                <p className=" my-2 fs-6">{item.created}</p>
              </Col>
              <Col className=" border text-center">
                <p className=" my-2 fs-6">{item.modified}</p>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default Home;
