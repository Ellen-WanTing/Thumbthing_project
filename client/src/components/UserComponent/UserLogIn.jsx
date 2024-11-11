import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './userSignUp.css';
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { FaComments, FaPen } from "react-icons/fa";
import { Link, useHistory,useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';

export function LogIn() {

    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const [valid, setValid] = useState(false);

    console.log(location);
    
    useEffect(() => {
        var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){  
        console.log(token)
            axios.get("http://localhost:8000/api/userOnly",{headers:{
                Authorization:`Bearer ${token}`
            }}).then((res)=>{
                console.log(res)
                if(res.data==="Welcom User."){                
                    
                    setValid(true);
                    history.push("/home");
                    
                }            
            })                 
        }        
    }, [])
      
    function login(){
        console.log(email);
        console.log(password);
        axios.post("http://localhost:8000/api/login",{
            "Email":email,
            "Password":password,
        }).then((res)=>{  
            console.log(res.data)                      ;
            localStorage.setItem("token",res.data.token);
            toast("LogIn successful!")
            if(location.state.from!=="/signup")history.push(location.state.from);
            window.location.reload();
        }).catch((err)=>{
            toast("LogIn failed! Try again!")
            console.log(err)
        })
    }

    if(valid) 
        return <div className="mobile-container">You are already logged in! Redirecting...</div>
    return (
        <React.Fragment>
            <Container className="signupholder">
                <Row>
                    <Col sm={12}>
                        <Card border="light">
                            <Row>
                                <Col sm={12}><b><Card.Header>Log In</Card.Header></b></Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label style={{ marginLeft: "0.5%" }}>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                         </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label style={{ marginLeft: "0.5%" }}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button style={{ marginLeft: "0.5%" }} variant="primary" onClick={()=>{login()}}>
                                            Log In
                                     </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: "2%" }} sm={{ span: 12, offset: 0 }}>
                        <Card border="light">
                            <Row>
                                <Col sm={12}><b><Card.Header>Not Registered</Card.Header></b></Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Card.Text><FaPen />&ensp;Write summaries for Books</Card.Text>
                                    <Card.Text><BsFillBookmarkFill />&ensp;Bookmark favourite summaries</Card.Text>
                                    <Card.Text><AiFillLike />&ensp;Like other Summaries</Card.Text>
                                    <Card.Text><MdReport />&ensp;Report other Summaries</Card.Text>
                                    <Card.Text><FaComments />&ensp;Give comments on summaries</Card.Text>
                                    <Link to="/signup"><Button style={{ marginLeft: "0.5%" }} variant="primary" type="submit">
                                        Sign Up
                                </Button></Link>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

