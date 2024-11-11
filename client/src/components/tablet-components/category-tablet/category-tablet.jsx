import React from 'react';
import { Card } from 'react-bootstrap';
import './category-tablet.css';
import { Link } from 'react-router-dom';

export function CategoryTablet(props) {
    return (
        <React.Fragment>
            <Link to={props.Id}><Card className="bg-dark card text-white">
                <Card.Img thumbnail src={props.Image} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title className="cardTitle"><h3>{props.name}</h3></Card.Title>
                </Card.ImgOverlay>
            </Card></Link>
        </React.Fragment>
    );
}

