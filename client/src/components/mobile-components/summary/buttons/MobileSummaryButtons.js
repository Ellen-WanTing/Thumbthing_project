import React from 'react';
import axios from 'axios';

import {Link,useHistory,useLocation} from 'react-router-dom';

import { BiUpvote } from "react-icons/bi";
import { CgMoreR } from "react-icons/cg";
import { VscEdit,VscCommentDiscussion } from "react-icons/vsc";
import { MdDelete,MdReport } from "react-icons/md";
import { IconContext } from "react-icons";

import {  toast } from 'react-toastify';

import './MobileSummaryButtons.css';

import {useLogin} from '../../../useLogin';

export default function MobileSummaryButtons(props){   
console.log(props)
    let history = useHistory();

    let location = useLocation()
    let loggedIN = useLogin();

    let userID = props.UserID;

    const upvoteSummary = (id)=>{
        if(!loggedIN){
            toast("Log in first!")
            history.push("/login",{from:location.pathname})
        }
        
        axios.put("http://localhost:8000/api/summary/like/"+id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(()=>{          
        toast("Upvoted!");
            window.location.reload();
        }).catch((err)=>{
            toast("couldn't upvote");
        })
    };

    const reportSummary = (id)=>{
        if(!loggedIN){
            toast("Log in first!")
            history.push("/login",{from:location.pathname})
        }
        axios.put("http://localhost:8000/api/summary/report/"+id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(()=>{
            toast("Reported!");
            window.location.reload();
        }).catch((err)=>{
            toast("couldn't report");
        })
    };

    const deleteSummary = (id)=>{
        if(!loggedIN){
            toast("Log in first!")
            history.push("/login",{from:location.pathname})
        }        
        axios.delete("http://localhost:8000/api/summary/"+id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(()=>{
            toast("Deleted!");
            history.push(`/book/${props.BookID}`)
            window.location.reload();
        }).catch((err)=>{
            toast("couldn't delete");
        })
    };

    const editSummary = (id)=>{
        if(loggedIN)
            history.push(`/book/${props.BookID}/summary/edit/${id}`);
        else {
            toast("Log in first!")
            history.push(`/login`,{from:location.pathname});
        }
    }

    var iconProperties = {size:"20px",color:"white",padding:"5px"} 

    return <React.Fragment><div className="summary-buttons-container">   
    {
        loggedIN?
        <React.Fragment>
            <div onClick={()=>{upvoteSummary(props.SummaryID)}}><IconContext.Provider value={iconProperties}><BiUpvote></BiUpvote></IconContext.Provider>{props.LikeNum}</div>    
            {
                userID===props.SummaryUserID?
                <React.Fragment>
            <div onClick={()=>{editSummary(props.SummaryID)}}><IconContext.Provider value={iconProperties}><VscEdit></VscEdit></IconContext.Provider></div>        
            <div onClick={()=>{deleteSummary(props.SummaryID)}}><IconContext.Provider value={iconProperties}><MdDelete></MdDelete></IconContext.Provider></div>    
            </React.Fragment>:null
            }
            <div onClick={()=>{reportSummary(props.SummaryID)}}><IconContext.Provider value={{...iconProperties,color:"red"}}><MdReport></MdReport></IconContext.Provider></div>
            

            {props.readmore !==undefined ?
            <div className="summary-read-more-button" >            
                <Link to={`/book/${props.BookID}/summary/`+props.SummaryID} ><IconContext.Provider value={iconProperties}><CgMoreR></CgMoreR></IconContext.Provider></Link>
            </div>:null}
            {props.addComment !==undefined?    
            <div onClick={props.addComment}><IconContext.Provider value={iconProperties}><VscCommentDiscussion></VscCommentDiscussion></IconContext.Provider></div>:null}        
        </React.Fragment>
        :
    
        props.readmore !==undefined ?
        <div className="summary-read-more-button" >            
            <Link to={`/book/${props.BookID}/summary/`+props.SummaryID} ><IconContext.Provider value={iconProperties}><CgMoreR></CgMoreR></IconContext.Provider></Link>
        </div>:null
    } 
</div>

</React.Fragment>;
}