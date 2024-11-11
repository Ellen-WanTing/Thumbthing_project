import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { Redirect } from 'react-router-dom';
import jwt_decode  from 'jwt-decode';
export function TabletAddSummary(props) {
    const [summary, setSummary] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submitSummary = () => {
        var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){
            token = jwt_decode(token)
        }
        props.post('http://localhost:8000/api/summary', {
            userID:token?token.userID:-1,
            bookID: props.BookID,
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
                                <Card.Header>Write New Summary</Card.Header>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} onChange={(e) => { setSummary(e.target.value) }} />
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

