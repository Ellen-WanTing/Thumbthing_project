import React from 'react';
import { AuthorBookComponent } from '../../author-tablet/authorBookComponent.jsx';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './categoryBookDisplay.css';

export function CategoryBookDisplay() {
    let { id } = useParams();

    return (
        <React.Fragment>
            <Container id="containerCategory" style={{ maxWidth: "76%" }}>
                <Row>
                    <Col className="authorContainer" style={{ marginTop: "4%", marginLeft: "8%" }}>
                        <AuthorBookComponent url={"http://localhost:8000/api/book?categoryID=" + id} />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

