import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { Redirect, useParams } from 'react-router-dom';
import jwt_decode  from 'jwt-decode';
export function TabletEditSummary(props) {
    const [summary, setSummary] = useState(props.data.SummaryText);
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    const submitSummary = () => {
        var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){
            token = jwt_decode(token)
        }
        props.put(`http://localhost:8000/api/summary/${id}`, {
            userID:token?token.userID:-1,
            summary: summary,
        })

        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to={"/book/" + props.BookID}></Redirect>
    }
    else {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Card border="light">
                                <Card.Header>Edit Summary</Card.Header>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" value={summary} rows={5} onChange={(e) => { setSummary(e.target.value) }} />
                                        <Button style={{ marginTop: "2%" }} variant="light" size="md" onClick={submitSummary}><SiAddthis /></Button>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

