import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext, useEffect, useState } from "react";
import TaskContex from "../Context/TaskContext";
import axios from "axios";

const MyNavbar = () => {
  const {
    allTask,
    setAllTask,
    fetchTasks,
    isSeached,
    setIsSearched,
    searchText,
    setSearchText,
    setErrorMessage,
  } = useContext(TaskContex);

  const getSearchTask = async () => {
    if (searchText.length < 3) {
      setErrorMessage("Please enter minimum 3 characters");
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/tasks/search/`,
          searchText
        );
        setAllTask(res.data);
        setIsSearched(true);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSeached && allTask.length === 0) {
      setErrorMessage("No Data Available");
      // setIsSearched(false);
      // fetchTasks();
    }
  }, [isSeached]);

  const handleSearch = async (e) => {
    e.preventDefault();
    searchText != ""
      ? getSearchTask()
      : setErrorMessage("Please enter a search value");
    // setSearchText("");
  };

  return (
    <Navbar bg="primary" fixed="top">
      <div className=" container-fluid">
        <Navbar.Brand href="/" className="text-white fs-4">
          Logo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link href="contact" className="text-white">
            Contact
          </Nav.Link>
          <Nav.Link href="about" className="text-white">
            About
          </Nav.Link>
          <NavDropdown title="Items" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Item 3</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated Item 4
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="outline-light" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
