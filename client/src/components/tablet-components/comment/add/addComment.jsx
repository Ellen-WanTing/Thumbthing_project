import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import {toast} from 'react-toastify';
import axios from 'axios';
import { GoPlus,GoPencil } from "react-icons/go";
import jwt_decode  from 'jwt-decode';
export function TabletAddComment(props) {
    let [value,setValue] = useState('');

    const addCommentToDatabase = ()=>{
        var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){
            token = jwt_decode(token)
        }
        axios.post("http://localhost:8000/api/comment",{
            userID:token?token.userID:-1,
            summaryID:props.summaryID,
            comment:value,},
            {headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((res)=>{            
            toast("Comment Successfully Added!");
            props.hideAddComment();
            window.location.reload();
        }).catch((err)=>{
            toast("ERROR Occured in adding!");
        })
    }

    const editComment = ()=>{
        axios.put("http://localhost:8000/api/comment/"+props.commentID,{
            comment:value},
            {headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((res)=>{            
            toast("Comment Edited!");
            props.hideAddComment();
            window.location.reload();
        }).catch((err)=>{
            toast("ERROR Occured!");
        })
    }
    const edit = props.commentID!==undefined;

    useEffect(() => {
        if(edit){
            axios.get("http://localhost:8000/api/comment/"+props.commentID,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{                
                    setValue(res.data[0].Text);
            })
        }        
    }, [])
   
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Card border="light">
                                <Card.Header>{!edit?"Add":"Edit"} a Comment</Card.Header>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} onChange={(e)=>{setValue(e.target.value)}} value={value}/>
                                        <Button style={{ marginTop: "2%" }} variant="primary" size="sm" onClick={!edit?addCommentToDatabase:editComment}>{!edit?<GoPlus/>:<GoPencil/>}</Button>
                                        <Button style={{ marginTop: "2%",marginLeft:"2%" }} variant="danger" size="sm" onClick={()=>{props.hideAddComment()}}><ImCross/></Button>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    
}

