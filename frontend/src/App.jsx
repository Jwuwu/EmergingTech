import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';
import CreateUser from './pages/user/CreateUser';
import Login from './pages/user/Login';


const App = () => {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Game Library App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" >Game Library</Nav.Link>
              <Nav.Link as={Link} to="/userpage" >User Game Library</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/create">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
};

export default App;
