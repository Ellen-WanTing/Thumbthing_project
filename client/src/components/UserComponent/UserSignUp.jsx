import React,{useState} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './userSignUp.css';
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { FaComments, FaPen } from "react-icons/fa";
import { Link, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';

import axios from 'axios';

export function SignUp() {
    const history = useHistory();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function signup(){
        axios.post("http://localhost:8000/api/signup",{
            "Fullname": fullName,
             "Email":email,
            "Password":password
        }).then((res)=>{                        
            toast("Signup successful!")
            history.push("/login");
        }).catch((err)=>{
            toast("Signup failed! Try again!")
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <Container className="signupholder">
                <Row>
                    <Col sm={12}>
                        <Card border="light">
                            <Row>
                                <Col sm={12}><b><Card.Header>Sign up / Registration</Card.Header></b></Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label style={{ marginTop: "2.5%", marginLeft: "0.5%" }}>Full Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label style={{ marginLeft: "0.5%" }}>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                             </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label style={{ marginLeft: "0.5%" }}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Button style={{ marginLeft: "0.5%" }} variant="primary"  onClick={signup}>
                                            Sign Up
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
                                <Col sm={12}><b><Card.Header>Already Registered</Card.Header></b></Col>
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
                                    <Link to="/login"><Button style={{ marginLeft: "0.5%" }} variant="primary" type="submit">
                                        Log In
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

