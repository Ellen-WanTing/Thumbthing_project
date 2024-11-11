import React,{useState,useEffect} from 'react';
import './header-tablet.css';
import { Link,useHistory,useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl, Image } from 'react-bootstrap';
import images from './images/logo.png';

import {toast} from "react-toastify";

import axios from 'axios';


var searchCategories = ["Books","Summaries"];

export function Header(props) {
    const history = useHistory();
    const location = useLocation();
    let [query,setQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState(searchCategories[0]);

    const [loggedIN, setLoggedIN] = useState(false);
        useEffect(() => {
            var token = localStorage.getItem("token");
            if(token!==undefined && token!==null){
                axios.get("http://localhost:8000/api/userOnly",{
                    headers:{Authorization:"Bearer "+token}
                }).then((res)=>{
                    if(res.data==="Welcom User."){
                        setLoggedIN(true);                                            
                    }
                })
            }            
            
        },[])

    const logout = ()=>{
        localStorage.setItem("token",undefined);
        toast("You are logged out!");
        history.push("/home");
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Container id="containerHeader" fluid>
                <Row>
                    <Col sm={12} style={{ backgroundColor: "#efefef" }}>
                        <Navbar>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav id="navLinks">
                                    <Nav.Link><Link id="navHomeOption" to="/home">Home</Link></Nav.Link>
                                    {/* <Nav.Link><Link id="navAboutOption" to="/about">About</Link></Nav.Link> */}
                                    {loggedIN?<Nav.Link><Link id="navLogoutOption" onClick={logout}>Log Out</Link></Nav.Link>:<React.Fragment>
                                    <Nav.Link><Link id="navSignupOption" to="/signup">Sign Up</Link></Nav.Link>
                                    <Nav.Link><Link id="navLoginOption" to={{pathname:"/login",state:{from:location.pathname}}}>Log In</Link></Nav.Link>
                                    </React.Fragment>}
                                </Nav>
                                <Form inline>
                                    <Form.Control as="select" onChange={(e)=>{console.log("Old State "+searchCategory +"New State "+ e.target.value);setSearchCategory(e.target.value)}}>
                                    {
                                        searchCategories.map((val)=>{
                                            return <option value={val}>{val}</option>
                                        })
                                    }                                        
                                    </Form.Control>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>{setQuery(e.target.value)}} />
                                    <Link to={`/search/${searchCategory}/${query}`}>   <Button variant="outline-primary" >Search</Button>       </Link>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

