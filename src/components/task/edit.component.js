import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditTask() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchTask()
  },[])

  const fetchTask = async () => {
    await axios.get(`http://localhost:8000/api/tasks/${id}`).then(({data})=>{
      const { title, content, status, type } = data.task
      setTitle(title)
      setContent(content)
      setStatus(status)
      setType(type)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }  

  

  const updateTask = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('title', title)
    formData.append('content', content)
    formData.append('status', status)
    formData.append('type', type)


    await axios.post(`http://localhost:8000/api/tasks/${id}`, formData).then(({data})=>{
  
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Task</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateTask}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Content">
                            <Form.Label>content</Form.Label>
                            <Form.Control as="textarea" rows={3} value={content} onChange={(event)=>{
                              setContent(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                                <option value="..">Choose one option</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              
                            
                            </Form.Control>

                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={type}
                            onChange={(e) => setType(e.target.value)}>
                                <option value="..">Choose one option</option>
                                <option value="everyDay">EveryDay</option>
                                <option value="everyMonday">Every Monday</option>
                                <option value="Every-M-W-F">Every Monday Wednesday Friday</option>
                                <option value="firstFiveDayMonth">First Five Day Month</option>
                                <option value="fiveDayMonthMarch">Five Day Month March</option>
                            
                            </Form.Control>

                        </Form.Group>
                      </Col>
                  </Row>

                  


             
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}