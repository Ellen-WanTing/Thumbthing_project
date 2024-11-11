import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { SummaryUI } from "./singleSummaryUI/singleSummaryUI.jsx";
import LoadingComponent from '../../LoadingComponent';

export function SummariesTablet(props) {
    var summaries = props.data;
    useEffect(() => {
        setTimeout(()=>{props.fetch()},500)        
    }, []) 
    if (summaries === null)
        return <LoadingComponent />
    if (summaries.length >= 1) {
        return (
            <div id="SummaryMain" style={{ display: "flex", flexDirection: "column" }}>
                <Container>
                    <Row style={{ marginTop: "6%" }}>
                        <Col sm={12}>
                            <Card border="light" style={{ width: '100%' }}>
                                <Row>
                                    <Col sm={10}>
                                        <Card.Body>
                                            <Card.Text>
                                                Press the + button to add a summary
                                    </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col sm={2}>
                                        <div id="add-summary-button"><Link to={"/book/" + props.BookID + "/addSummary"}><Button variant="light" size="lg"><SiAddthis /></Button></Link></div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        {summaries.map((summary) => {                            
                            return <SummaryUI data={summary} BookID={props.BookID} UserID={props.UserID} SummaryUserID={summary.UserID}/>
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
    else {
        return (
            <React.Fragment>
                <Container>
                    <Row style={{ marginTop: "6%" }}>
                        <Col sm={12}>
                            <Card border="light" style={{ width: '100%' }}>
                                <Card.Header>Add New Summary</Card.Header>
                                <Row>
                                    <Col sm={10}>
                                        <Card.Body>
                                            <Card.Text>
                                                No Summaries yet. Press the + button to add a summary
                                    </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col sm={2}>
                                        <div id="add-summary-button"><Link to={"/book/" + props.BookID + "/addSummary"}><Button variant="light" size="lg"><SiAddthis /></Button></Link></div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

