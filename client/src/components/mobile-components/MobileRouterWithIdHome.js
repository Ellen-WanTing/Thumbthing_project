import MobileHome from "./home/MobileHome";

import {useParams} from 'react-router-dom';

export default function MobileRouterWithIdHome(props){
    const {id} = useParams();
    
    if(props.author!==undefined)
        return <MobileHome URL={"http://localhost:8000/api/book?authorID="+id}></MobileHome>
    
    if(props.publisher!==undefined)
        return <MobileHome URL={"http://localhost:8000/api/book?publisherID="+id}></MobileHome>
    
    if(props.category!==undefined)
        return <MobileHome URL={"http://localhost:8000/api/book?categoryID="+id}></MobileHome>    
}