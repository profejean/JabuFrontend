import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditTask from "./components/task/edit.component";
import TaskList from "./components/task/list.component";
import CreateTask from "./components/task/create.component";
import UserList from "./components/user/list.component";
import CreateUser from "./components/user/create.component";
import EditUser from "./components/user/edit.component";
import TaskProgramingList from "./components/task/programing/list.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <div className="container">
          <div className="row">
            <div className='col-12'>
              <Link to={"/"} className="navbar-brand text-white">
                Jabu Test
              </Link> 
          
              <Link className='btn btn-primary mb-2 float-end' to={"/user/list"}>
                  Users
              </Link>
              <Link className='btn btn-primary mb-2 float-end' to={"/"}>
                  Tasks
              </Link>
              <Link className='btn btn-primary mb-2 float-end' to={"/task/programing/list"}>
                  Tasks Programing
              </Link>
          </div>           
          </div>
        </div>
               
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/task/programing/list" element={<TaskProgramingList />} />
            <Route path="/user/list" element={<UserList />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/task/create" element={<CreateTask />} />
            <Route path="/task/edit/:id" element={<EditTask />} />
            <Route exact path='/' element={<TaskList />} />

          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
