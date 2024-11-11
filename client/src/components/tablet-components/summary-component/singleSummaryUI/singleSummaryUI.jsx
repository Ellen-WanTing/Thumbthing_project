import React from 'react';
// import images from './images/profilePic.jpeg';
import { Container, Row, Col, Card} from 'react-bootstrap';
import './singleSummaryUI.css';
import {TabletSummaryButtons} from '../SummaryButtons/summartButtons.jsx';


export function SummaryUI(props) {
    
    var data = props.data;
    
    return (
        <React.Fragment>
            <Container key={data.SummaryID}>
                <Row>
                    <Col sm={12}>
                            <Card style={{ marginBottom: "2%",border: "3px solid grey"}} border="dark">
                                <Card.Body>
                                    <Row>
                                        <Col sm={6}><Card.Title style={{ color: "red" }}>User Name : {data.UserName}</Card.Title></Col>
                                        <Col sm={6} style={{ padding: "0" }}>
                                        <TabletSummaryButtons SummaryID={data.SummaryID} SummaryUserID={data.UserID} BookID={data.BookID} UserID={props.UserID} LikeNum={data.LikeNum} readmore/>
                                        </Col>
                                    </Row>
                                    <Card.Text style={{ color: "black" }} id="summaryText">
                                        {data.SummaryText}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

