import React, { useEffect, useState } from 'react';
import './navbar-tablet.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function NavigationBar() {

    var [category, setCategory] = useState(null);
    var [author, setAuthor] = useState(null);
    var [publisher, setPublisher] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/category?offset=0&limit=4").then((res) => {
            console.log(res);
            setCategory(res.data);
        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/author?offset=0&limit=4").then((res) => {
            console.log("author", res);
            setAuthor(res.data);
        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/publisher?offset=0&limit=4").then((res) => {
            console.log("publisher", res);
            setPublisher(res.data);
        })
    }, []);

    if (category !== null && author !== null && publisher !== null)

        return (
            <React.Fragment>
                <ul className="sidebar">
                    <div class="sidebarMenuHeading"><b>Categories</b></div>
                    <div className="sidebarMenu">
                        {category.map((val) => {
                            return <Link className="navLink" to={"/category/" + val.CategoryID}>{val.Name} </Link>
                        })}
                        <Link className="navLink" to="/category">More</Link>
                    </div>
                    <div class="sidebarMenuHeading"><b>Authors</b></div>
                    <div className="sidebarMenu">
                        {author.map((val) => {
                            return <Link className="navLink" to={"/author/" + val.AuthorID}>{val.FullName} </Link>
                        })}
                        <Link className="navLink" to="/author">More</Link>
                    </div>
                    <div class="sidebarMenuHeading"><b>Publishers</b></div>
                    <div className="sidebarMenu">
                        {publisher.map((val) => {
                            return <Link className="navLink" to={"/publisher/" + val.PublisherID}>{val.FullName} </Link>
                        })}
                        <Link className="navLink" to="/publisher">More</Link>
                    </div>
                </ul>
            </React.Fragment>

        );
    return <div>Loading...</div>
}

