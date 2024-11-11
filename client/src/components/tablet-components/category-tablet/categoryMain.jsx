import React from 'react';
// import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { CategoryTablet } from './category-tablet.jsx';
import images0 from './images/ActionAndAdventure.png';
import images1 from './images/BiographiesandHistory.png';
import images2 from './images/Childrens.png';
import images3 from './images/Fantasy.png';
import images4 from './images/HistoryFiction.png';
import images5 from './images/Horror.png';
import images6 from './images/LiteraryFiction.png';
import images7 from './images/MysteryandThriller.png';
import images8 from './images/NonFiction.png';
import images9 from './images/Romance.png';
import images10 from './images/ScienceFiction.png';
import images11 from './images/ActionAndAdventure.png';
import images12 from './images/BiographiesandHistory.png';

import {LoadingComponent} from '../../../components';

export function CategoryMain(props) {

    var images = [images0,images1,images2,images3,images4,images5,
        images6,images7,images8,images9,images10,images11,images12];

    var category = props.data;
    if(category!==null){
        for(var i=0;i<category.length;i++){
            category[i].image = images[i];    //category[i].[image] =  images[i]; 
        }

        return (
            <React.Fragment>
                <Container id="containerMainCategory" style={{width:"74%"}}>
                <Row >
                    {category.map((val) => {
                        return (
                                <Col className="categoryHolder" sm={4}><CategoryTablet Image={val.image} name={val.Name} Id={"/category/"+val.CategoryID} /></Col>                            
                        );
                    })
                    }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
    return <LoadingComponent/>
}

