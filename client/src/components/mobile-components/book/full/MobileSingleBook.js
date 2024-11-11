import './MobileSingleBook.css'
import StarRating from '@rubenvara/react-star-rating';
import { useHistory } from 'react-router-dom';

export default function MobileSingleBook(props){
    let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
    
    // const [book,setBook] = useState(null);   
    var book = props.data;
    var history = useHistory()
    if(book!==null)
        return <div className="full-book-container mobile-container" >
            <div className="full-book-image-container"  onClick={()=>{history.push("/book/"+book.BookID)}}>
                <img className="full-book-image" src={book.Image} alt="book" />
            </div>    
            
            <div className="full-book-details-container">
                <div className="full-book-details-title"><strong>Title: </strong>{book.Title}</div>        
                <div className="full-book-details-author"  onClick={()=>{history.push("/author/"+book.AuthorID)}}><strong>Author:</strong> {book.AuthorName}</div>            
                <div className="full-book-details-category"  onClick={()=>{history.push("/category/"+book.CategoryID)}}><strong>Category:</strong> {book.CategoryName}</div>      
                <div className="full-book-details-publisher" onClick={()=>{history.push("/publisher/"+book.PublisherID)}}><strong>Publisher:</strong> {book.PublisherName}</div> 
                <div className="full-book-details-year"><strong>Year:</strong> {book.YearOfPublication}</div> 
                <div className="full-book-details-language"><strong>Language:</strong> {languageNames.of(book.Language)}</div>                 
                <div className="full-book-details-rating"><strong>Rating:</strong><StarRating rating={book.Rating} config={{fullColor:'blue'}} /></div>
            </div>
        </div>;
    return <div className="mobile-container">Loading...</div>
}

export {MobileSingleBook};