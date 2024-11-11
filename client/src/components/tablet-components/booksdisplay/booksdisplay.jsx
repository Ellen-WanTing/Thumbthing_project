import React from 'react';
import './booksdisplay.css';
import { useHistory } from 'react-router-dom';

export function BooksDisplay(props) {
    const history = useHistory();

    function routeToFullBookDisplay(bookid) {
        history.push("/book/" + bookid);
    }
    var books = props.data;

    if (books !== null && books !== undefined) {
        return (
            <React.Fragment>
                {books.map((val) => {
                    return (
                        <div className="bookdisplay" key={val.BookID} onClick={() => { routeToFullBookDisplay(val.BookID) }}>
                            <img className="bookDetailsImages" src={val.Image} alt="Harry Potter" />
                            <div className="booksDetailsTitle"><strong>{val.Title}</strong></div>
                            <div className="booksDetailsAuthor"><strong>{val.AuthorName}</strong></div>
                            <div className="bookDetailsPublisher"><strong>{val.PublisherName}</strong></div>
                        </div>
                    );
                })
                }
            </React.Fragment>
        );
    }
    return <div>Loading...</div>
}

