import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './SingleBookUI.css';

export function SingleBookUI(props) {

    var book = props.data;

    var history = useHistory();

    if (book !== null)
        return (
            <React.Fragment>
                <Container style={{ marginTop: "4%" }} onClick={()=>{history.push("/book/"+book.BookID)}}>
                    <Row sm={12}>
                        <Col sm={5} style={{ paddingRight: "0px" }}>
                            <Image style={{ width: "75%", height: "85%" }} src={book.Image} thumbnail />
                        </Col>
                        <Col sm={7} style={{ paddingLeft: "0px" }}>
                            <Card.Body id="headerBody">
                                <Row><Card.Text style={{ color: "red" }}>Title : {book.Title}</Card.Text></Row>
                                <Row><Card.Text style={{ color: "green" }}>Author : {book.AuthorName}</Card.Text></Row>
                                <Row><Card.Text style={{ color: "blue" }}>Rating : {book.Rating}</Card.Text></Row>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Card border="danger" style={{ width: "100%", marginTop: "-20px" }}>
                                <Card.Body id="bookbody">
                                    <Row>
                                        <Col sm={6}><Card.Text style={{ color: "brown" }}>Publisher : {book.PublisherName}</Card.Text></Col>
                                        <Col sm={6}><Card.Text style={{ color: "red" }}>Published Date : {book.YearOfPublication}</Card.Text></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Card.Text style={{ color: "purple" }}>Category : {book.CategoryName}</Card.Text></Col>
                                        <Col sm={6}><Card.Text style={{ color: "green" }}>Language : {book.Language}</Card.Text></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    return <div>Loading...</div>
}

