import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './authorBookComponent.css';

export function AuthorBookComponent(props) {
    const history = useHistory();
    function routeToFullBookDisplay(bookid) {
        history.push("/book/" + bookid);
    }
    const authors = props.data;

    if (authors !== null)
        return (
            <React.Fragment>
                <Container id="authorContainer">
                    <Row>
                        <Col id="authorCard" style={{ dislay: "flex", flexDirection: "row", flexWrap: "wrap" }} sm={12} >

                            {authors.map((val) => {
                                return (
                                    <Col id="singleCard" sm={4} style={{ marginBottom: "0%", margintTop: "3%" }}>
                                        <Card style={{ border: "none" }} onClick={() => { routeToFullBookDisplay(val.BookID) }}>
                                            <Card.Img style={{ height: "204px", width: "140px" }} variant="top" src={val.Image} />
                                            <Card.Body style={{ padding: "0", paddingTop: "3%" }}>
                                                <Card.Title style={{ color: "red", fontSize: "medium" }}><strong>{val.Title}</strong></Card.Title>
                                                <Card.Title style={{ color: "purple", fontSize: "medium" }}><strong>{val.AuthorName}</strong></Card.Title>
                                                <Card.Title style={{ color: "brown", fontSize: "medium" }}><strong>{val.PublisherName}</strong></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                            }
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    return <div>Loading...</div>
}

