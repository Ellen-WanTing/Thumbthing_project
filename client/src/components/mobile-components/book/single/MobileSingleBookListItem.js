import './MobileSingleBookListItem.css'

import {useHistory} from 'react-router-dom';

export default function MobileSingleBookListItem(props){
    const history = useHistory();
    
    function routeToFullBookDisplay(){         
        history.push("/book/"+props.book.BookID);
    }

    return <div className="book-container" key={props.book.BookID} onClick={routeToFullBookDisplay}>
    <img className="book-details-image" src={props.book.Image} alt="book" />
    <div className="book-details-container">
        <div className="book-details-title">{props.book.Title}</div>

        <div className="book-details-author">{props.book.AuthorName}</div>            
    </div>
</div>
}