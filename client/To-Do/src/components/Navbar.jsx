import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  return (
    <Navbar bg="primary" fixed="top">
      <Container>
        <Navbar.Brand href="home" className="text-white fs-4">
          Logo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="home" className="text-white">
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
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
