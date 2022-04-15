import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [end, setEnd] = useState("")
  const [validationError,setValidationError] = useState({})



  const createTask = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('title', title)
    formData.append('content', content)
    formData.append('type', type)
    formData.append('end', end)


    await axios.post(`http://localhost:8000/api/tasks`, formData).then(({data})=>{
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
              <h4 className="card-title">Create Task</h4>
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
                <Form onSubmit={createTask}>
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
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} value={content} onChange={(event)=>{
                              setContent(event.target.value)
                            }}/>
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
                  <Row> 
                      <Col>
                        <Form.Group controlId="End">
                            <Form.Label>Finish Task</Form.Label>
                            <Form.Control type="date" value={end} onChange={(event)=>{
                              setEnd(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
              
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
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