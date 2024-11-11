import React,{useState} from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import LoadingComponent from '../../../LoadingComponent';
import {TabletSummaryButtons} from '../SummaryButtons/summartButtons.jsx';
import {TabletCommentList} from '../../comment/list/TableCommentList';
import {TabletAddComment} from '../../comment/add/addComment';


export function TabletFullSummaryUI(props) {        
    
    const [showAddComment,setShowAddComment] = useState(false);
    
    const addComment = () => {
        setShowAddComment(true);
    };
    
    const hideAddComment = ()=>{
        setShowAddComment(false);
    }

    const fullSummaryRead = props.data;

    if (fullSummaryRead !== null)

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Card style={{ marginBottom: "1%", color: "6D82FF", marginTop: "2%",border: "3px solid grey" }} border="dark">
                            <Card.Header>Summary</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col sm={6}><Card.Title style={{ color: "red" }}>User Name : <strong>{fullSummaryRead.UserName}</strong></Card.Title></Col>
                                        <Col style={{ padding: "0" }}>
                                        <TabletSummaryButtons SummaryUserID={fullSummaryRead.UserID} BookID={props.BookID} UserID={props.UserID} SummaryID={fullSummaryRead.SummaryID} LikeNum={fullSummaryRead.LikeNum} addComment={addComment}/>                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Card.Text style={{ color: "black" }}>
                                        {fullSummaryRead.SummaryText}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                            {showAddComment?<React.Fragment><div id="add-comment-label">Add a comment:</div><TabletAddComment summaryID={fullSummaryRead.SummaryID} hideAddComment={hideAddComment}></TabletAddComment></React.Fragment>:null}
                            <TabletCommentList SummaryID={fullSummaryRead.SummaryID} SummaryUserID={fullSummaryRead.UserID} UserID={props.UserID}></TabletCommentList> 
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );

    return <LoadingComponent></LoadingComponent>
}

