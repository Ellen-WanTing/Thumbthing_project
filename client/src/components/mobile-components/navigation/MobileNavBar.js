import './MobileNavBar.css';
import React,{useState} from 'react';
import {       
    Link,useHistory,useLocation
} from "react-router-dom";

import { AiOutlineUserAdd,AiOutlineSearch,AiOutlineLogin,AiOutlineMan } from "react-icons/ai";

import {toast} from "react-toastify";

import {useLogin} from '../../../components';

var searchCategories = ["Books","Summaries"];

export default function MobileNavBar(){
    const history = useHistory();
    const location = useLocation();
        let [query,setQuery] = useState('');
        const [searchCategory, setSearchCategory] = useState(searchCategories[0]);

        const loggedIN = useLogin();        
        const logout = ()=>{
            localStorage.setItem("token",undefined);
            toast("You are logged out!");
            history.push("/home");
            window.location.reload();
        }

        return <div id="nav-container">   

            <div id="search-container">            
                <select id="search-selection" value={searchCategory} onChange={(e)=>{setSearchCategory(e.target.value)}}>
                    {searchCategories.map((x)=><option value={x} key={x}>{x}</option>)}
                </select>        
                <input type="text" id="search-input-box" value={query} 
                onChange={(e)=>{setQuery(e.target.value)}}
                    onKeyDown={(e)=>{if(e.keyCode===13)history.push(`/search/${searchCategory}/${query}`)}}
                ></input>  
                <div id="search-icon"><Link to={`/search/${searchCategory}/${query}`}><AiOutlineSearch />          </Link></div>
                
                {loggedIN?<div className="login-icon" onClick={logout}><AiOutlineMan/></div>:
                <React.Fragment><div className="login-icon"><Link to="/signup"><AiOutlineUserAdd />            </Link></div>
                <div className="login-icon"><Link to={{pathname:"/login",state:{from:location.pathname}}}><AiOutlineLogin />            </Link></div>
                </React.Fragment>
                }

            </div>          
            
            <div className="nav-list">
                <span className="nav-list-item"><Link to="/home">Home</Link></span>
                <span className="nav-list-item"><Link to="/popular">Popular</Link></span>
                <span className="nav-list-item"><Link to="/publisher">Publishers</Link></span>
                <span className="nav-list-item"><Link to="/author">Authors</Link></span>
                <span className="nav-list-item"><Link to="/category">Category</Link></span>
            </div>            
        </div>               
    
}

export {MobileNavBar};
