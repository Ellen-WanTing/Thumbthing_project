import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { HiThumbUp } from 'react-icons/hi';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaCommentAlt } from "react-icons/fa";
import { useLogin } from '../../../useLogin';


export function TabletSummaryButtons(props) {
    let { url } = useRouteMatch();

    let history = useHistory();

    let loggedIN = useLogin();

    const upvoteSummary = (id) => {
        axios.put("http://localhost:8000/api/summary/like/" + id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(() => {
            toast("Upvoted!");
            window.location.reload();
        }).catch((err) => {
            toast("couldn't upvote");
        })
    };

    const reportSummary = (id) => {
        axios.put("http://localhost:8000/api/summary/report/" + id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(() => {
            toast("Reported!");
            window.location.reload();
        }).catch((err) => {
            toast("couldn't report");
        })
    };

    const deleteSummary = (id) => {
        axios.delete("http://localhost:8000/api/summary/" + id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(() => {
            toast("Deleted!");
            history.push(`/book/${props.BookID}`)
        }).catch((err) => {
            toast("couldn't delete");
        })
    };

    const editSummary = (id) => {
        history.push(`/book/${props.BookID}/summary/edit/${id}`);
    }

    const correctUser = props.UserID === props.SummaryUserID;

    return (
        <React.Fragment>
            <Container>
                <Row>
                {loggedIN?<React.Fragment>
                    <Col sm={2} onClick={() => { upvoteSummary(props.SummaryID) }}><Button variant="primary" size="sm"><HiThumbUp /></Button></Col>
                    <Col sm={2} onClick={() => { reportSummary(props.SummaryID) }}><Button variant="danger" size="sm"><MdReportProblem /></Button></Col>
                    {correctUser?<Col sm={2} onClick={() => { editSummary(props.SummaryID) }}><Button variant="dark" size="sm"><AiFillEdit /></Button></Col>:null}
                    {correctUser?<Col sm={2} onClick={() => { deleteSummary(props.SummaryID) }} ><Button variant="danger" size="sm"><RiDeleteBin2Fill /></Button></Col>:null}
                    {props.readmore !==undefined ?
                    <Link to={`/book/${props.BookID}/summary/` + props.SummaryID}><Col sm={2}><Button variant="success" size="sm"><HiDotsCircleHorizontal /></Button></Col></Link>
                    :null}
                     {props.addComment !==undefined?    
                    <Col sm={2}><Button variant="success" size="sm" onClick={props.addComment}><FaCommentAlt /></Button></Col>
                    :null}
                    </React.Fragment>:
                    props.readmore !==undefined ?
                    <Link to={`/book/${props.BookID}/summary/` + props.SummaryID}><Col sm={2}><Button variant="success" size="sm"><HiDotsCircleHorizontal /></Button></Col></Link>
                    :null
                }
                </Row>
                <Row>
                    <Col style={{marginLeft:"3%"}} sm={{ span: 1, offset: 0 }}><strong style={{color:"blue"}}>{props.LikeNum}</strong></Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}