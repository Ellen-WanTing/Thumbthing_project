import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import {TabletAddComment} from '../add/addComment';
import { useLogin } from '../../../useLogin';



export function TabletCommentList(props) {

    const [comment,setComment] = useState(null);

    const [editComment,setEditComment] = useState(false);

    const [commentID,setCommentID] = useState(-1);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comment?summaryID=${props.SummaryID}`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
            setComment(res.data);            
        })
        setTimeout(()=>{
            axios.get(`http://localhost:8000/api/comment?summaryID=${props.SummaryID}`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
            setComment(res.data);            
        })
        },500)
    },[])

    const handleEditComment = (id)=>{
        setEditComment(true);        
        setCommentID(id);
    }

    const handleDelete = (id)=>{
        axios.delete("http://localhost:8000/api/comment/"+id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{            
            toast("Comment Deleted!");            
        }).catch((err)=>{
            console.log(err);
            toast("ERROR Occured in deleting!");
        })
    }

    const handleReport = (id)=>{
        axios.put("http://localhost:8000/api/comment/report/"+id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{            
            toast("Comment Reported!");            
        }).catch((err)=>{
            toast("ERROR Occured in reporting!");
        })
    }

    let loggedIN = useLogin();
    const correctUser = props.UserID === props.SummaryUserID;

    if(comment!==null) {
        if(comment.length<1)return <div>No comments yet!</div>;
    return (
        <React.Fragment>
            <Row>
             <Col sm= {{ span: 10, offset: 1 }}>
            <Container id="commentContainer">
            {
                comment.map((val)=>{
                        return (
                <Card style={{ marginBottom: "2%", marginTop: "2%",border:"3px solid blue" }} border="primary" key={val.CommentID}>
                    <Card.Header>Comment</Card.Header>
                    {
                        editComment?<React.Fragment><div className="comments-label">Edit:</div><TabletAddComment commentID ={commentID} hideAddComment={()=>{setEditComment(false);}}/></React.Fragment>:
                    <React.Fragment>
                    <Card.Body>
                        <Row>
                            <Col sm={{ span: 6, offset: 0 }}><Card.Title><strong>User :</strong>&ensp;&ensp;<strong style={{ color: "blue" }}>{val.FullName}</strong></Card.Title></Col>
                            {loggedIN?<React.Fragment>
                            {correctUser?<Col sm={{ span: 2, offset: 0 }}><Button variant="primary" size="sm" onClick={()=>{handleDelete(val.CommentID)}}><RiDeleteBin2Fill /></Button></Col>:null}
                            {correctUser?<Col sm={{ span: 2, offset: 0 }}><Button variant="dark" size="sm" onClick={()=>{handleEditComment(val.CommentID)}}><AiFillEdit /></Button></Col>:null}
                            <Col sm={{ span: 2, offset: 0 }}><Button variant="danger" size="sm" onClick={()=>{handleReport(val.CommentID)}}><MdReportProblem /></Button></Col>
                            </React.Fragment>:null}
                        </Row>
                        <br></br>
                        <Card.Text>{val.Text}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                    </React.Fragment>}
                </Card>
                     );
                    })
            }
            </Container>
            </Col>   
            </Row>
        </React.Fragment>
    );
    }
    return <div>Loading...</div>;
}