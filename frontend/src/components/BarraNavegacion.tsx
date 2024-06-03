import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function BarraNavegacion() {
  return (
    <>
        <Navbar expand={'md'} className="bg-success mb-3">
          <Container fluid>
            <Navbar.Brand  className="text-white" href="#">Estantería Virtual - Biblioteca Virtual de Ingeniería</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/" className="text-white">Home</Nav.Link>
                  <Nav.Link href="/AgregarLibro" className="text-white">Agregar Libro</Nav.Link>
                  <NavDropdown
                    title={<span className="text-white">Filtrar</span>}
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavDropdown.Item href="#">Carreras</NavDropdown.Item>
                    <NavDropdown.Item href="#">Semestres</NavDropdown.Item>
                    <NavDropdown.Item href="#">Cursos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">BVI</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Buscar</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </>
  );
}

export default BarraNavegacion;