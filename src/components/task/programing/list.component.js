import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";


export default function TaskListPrograming() {

    const [tasksprograming, setTasksPrograming] = useState([])

    useEffect(()=>{
        fetchTasksPrograming() 
    },[])

    const fetchTasksPrograming = async () => {
        await axios.get(`http://localhost:8000/api/tasksPrograming`).then(({data})=>{ 
            setTasksPrograming(data)
        })
    }

    const tomorrowTask = async () => {
        await axios.get(`http://localhost:8000/api/tasksProgramingTomorrow`).then(({data})=>{ 
            setTasksPrograming(data)
        })
    }

    const nextWeekTask = async () => {
        await axios.get(`http://localhost:8000/api/tasksProgramingNextweek`).then(({data})=>{ 
            setTasksPrograming(data)
        })
    }

    const nextTask = async () => {
        await axios.get(`http://localhost:8000/api/tasksProgramingNextask`).then(({data})=>{ 
            setTasksPrograming(data)
        })
    }

    const deleteTaskPrograming = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, finish task it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/tasksPrograming/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchTasksPrograming()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <Navbar bg="primary">
            <Container>
                <div className="container">
                <div className="row">
                    <div className='col-3'>            
                        <Button variant="success" onClick={()=>fetchTasksPrograming()}>
                            Task Today
                        </Button>
                    </div>
                    <div className='col-3'>            
                        <Button variant="success" onClick={()=>tomorrowTask()}>
                            Task Tomorrow
                        </Button>
                    </div> 
                    <div className='col-3'>
                        <Button variant="success" onClick={()=>nextWeekTask()}>
                            Task Next Week
                        </Button>
                    </div> 
                    <div className='col-3'>
                        <Button variant="success" onClick={()=>nextTask()}>
                            Task Next 
                        </Button>
                    </div>           
                </div>
                </div>
                    
            </Container>
          </Navbar>
          <div className="row">
            
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>     
                                    <th>Task Start</th> 
                                    <th>Task End</th>                                        
                                    <th>Status</th>                          
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasksprograming.length > 0 && (
                                        tasksprograming.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.content} </td>
                                                <td>{row.date} </td>
                                                <td>{row.end} </td>
                                                <td>{row.check} </td>
                                                <td>                                                   
                                                    <Button variant="danger" onClick={()=>deleteTaskPrograming(row.id)}>
                                                        Task Finish?
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}