import React,{useState,useRef,useEffect} from 'react';

import {toast} from 'react-toastify';

import './MobileHome.css';

import MobileSingleBookListItem from '../book/single/MobileSingleBookListItem';
import MobilePaginationButton from '../extras/pagination-button/MobilePaginationButton';

import { GrPrevious,GrNext } from "react-icons/gr";
import { IconContext } from "react-icons";
import LoadingComponent from '../../LoadingComponent';
import { useRouteMatch } from 'react-router-dom';

import axios from 'axios'

export default function MobileHome(props){                 
    const [pageNumber, setPageNumber] = useState(0);
    const pages = useRef([0,1,2,3,4]);
    const numberOfBooksOnPage = 9;     
    
    const books = props.data;
    
    var firstPage=0,lastPage=0;

    var route = useRouteMatch();
    const [heading, setHeading] = useState('');
    useEffect(() => {
        if(route.path.indexOf("home")<0){    console.log("in")            
            axios.get("http://localhost:8000/api"+route.path).then((res)=>{  
                console.log("in")          
                if(route.path.indexOf("category")>0){
                    console.log(res.data[0].Name)
                    setHeading(res.data[0].Name)
                }else{
                    console.log(res.data[0].FullName)
                    setHeading(res.data[0].FullName)
                }               
            })
            setTimeout(()=>axios.get("http://localhost:8000/api"+route.path).then((res)=>{            
                if(route.path.indexOf("category")>0){
                    setHeading(res.data[0].Name)
                }else{
                    setHeading(res.data[0].FullName)
                }               
            }),500)
        }         
    }, [])    


    if(books!==null){    
        lastPage = Math.floor(books.length/numberOfBooksOnPage);
    }      

    const getBooks = ()=>{
        if(books!==null){
            return books.slice((pageNumber)*numberOfBooksOnPage,(pageNumber+1)*numberOfBooksOnPage);
        }
    }
    const changePage = (nextPrevious,pageNum=0)=>{
        var books = props.data;              
        // var books = books;              
        if(books!==null){            
            switch(nextPrevious){
                //next Page
                case 1:
                    if(pageNumber<lastPage){
                        if(pageNumber+1>pages.current[pages.current.length-1]){
                            for(var i=0;i<pages.current.length;i++){
                                pages.current[i]+=pages.current.length;
                            }
                        }
                        setPageNumber(pageNumber+1);
                    }
                    break;
                //previous Page
                case -1:
                    if(pageNumber>firstPage){
                        if(pageNumber-1<pages.current[0]){
                            for(var x=0;x<pages.current.length;x++){
                                pages.current[x]-=pages.current.length;
                            }
                        }
                        setPageNumber(pageNumber-1);
                    }
                    break;
                //leads directly to the page clicked on
                case 0:
                console.log(pageNum)
                    if(pageNum>=firstPage && pageNum<=lastPage){                        
                        setPageNumber(pageNum);                        
                    }
                    break;
                default:
                    console.log("Error!");
                    toast("Error!");
            }
        }
    }

    books!==null?console.log(pageNumber,books.length,firstPage,lastPage,pages):console.log();        
    var iconSize = "15px";
    if(books!==null )
        return <div id="home-container" className="mobile-container">  
        {heading!==''?<h3>{heading}</h3>:null}          
            <div id="books-container">
                {getBooks().map((book) => {
                    return <MobileSingleBookListItem book={book} key={book.BookID}></MobileSingleBookListItem>                    
                })
                }                
            </div>

            <div id="pagination-element-container">
                <MobilePaginationButton key="prev" content={<IconContext.Provider value={{size:iconSize}}><GrPrevious/></IconContext.Provider>} 
                onClick={()=>{changePage(-1)}}>

                </MobilePaginationButton>            
                {   
                    pages.current.map((x)=>{    
                        var style = x===pageNumber?{fontWeight: "bold"}:{};
                        
                        if(x>lastPage)
                            style.color="red";

                        style.width=style.height=style.lineHeight=iconSize;
                        var displayNumber = x+1;
                        return <MobilePaginationButton key={x} content={displayNumber} style={style} onClick={
                            ()=>{                                                                
                                changePage(0,displayNumber-1)
                            }
                        }> </MobilePaginationButton>
                        })
                }
                <MobilePaginationButton key="next" content={<IconContext.Provider value={{size:iconSize}}><GrNext/></IconContext.Provider>} 
                onClick={()=>{changePage(1)}}></MobilePaginationButton>            
            </div>
        </div>

    return <LoadingComponent></LoadingComponent>
}

export {MobileHome};