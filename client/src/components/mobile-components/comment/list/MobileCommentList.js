import React,{useState,useEffect} from 'react';
import axios from 'axios';
import MobileAddComment from '../add/MobileAddComment';

import {toast} from 'react-toastify';

import { VscEdit} from "react-icons/vsc";
import { MdDelete,MdReport } from "react-icons/md";
import { IconContext } from "react-icons";

import './MobileCommentList.css';

import {useLogin} from '../../../useLogin';

import {useHistory,useLocation} from 'react-router-dom';
import { useUserID } from '../../../useUserID';

export default function MobileCommentList(props){  
    const [comment,setComment] = useState(null);

    const [editComment,setEditComment] = useState(false);

    const [commentID,setCommentID] = useState(-1);

    let loggedIN = useLogin();

    let userID = useUserID();
    
    let history = useHistory();

    let location = useLocation();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comment?summaryID=${props.SummaryID}`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
            setComment(res.data);            
        })
        setTimeout(()=>{axios.get(`http://localhost:8000/api/comment?summaryID=${props.SummaryID}`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
            setComment(res.data);            
        })},500)
    },[])

    const handleEditComment = (id)=>{
        setEditComment(true);        
        setCommentID(id);
    }

    const handleDelete = (id)=>{
        axios.delete("http://localhost:8000/api/comment/"+id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{            
            toast("Comment Deleted!");    
            window.location.reload();        
        }).catch((err)=>{
            console.log(err);
            toast("ERROR Occured in deleting!");
        })
    }

    const handleReport = (id)=>{
        axios.put("http://localhost:8000/api/comment/report/"+id,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{            
            toast("Comment Reported!");  
            window.location.reload();          
        }).catch((err)=>{
            toast("ERROR Occured in reporting!");
        })
    }

    const correctUser = userID===props.SummaryUserID;

    if(comment!==null) {
        if(comment.length<1)return <div>No comments yet!</div>;

        var iconProperties = {size:"16px",color:"blue",padding:"5px"} ;

        return <div id="comments-container">          
        <div className="comments-label">Comments:</div>
        {editComment?<React.Fragment><div className="comments-label">Edit:</div><MobileAddComment commentID ={commentID} hideAddComment={()=>{setEditComment(false);}}/></React.Fragment>:
        <div id="comments-list-container">            
                {comment.map((val)=>{
                    return <div className="comment-container" key={val.CommentID}>
                        <div className="comment-text-container">
                            <div className="comment-text-label">Comment:</div>
                            <div className="comment-text">{val.Text}</div>
                        </div>
                        <div className="comment-user-container">
                            <div className="comment-user-label">User:</div>
                            <div className="comment-user">{val.FullName}</div>
                        </div>  
                        {loggedIN?                      
                        <div className="comment-buttons-container">
                            {correctUser?<div className="comment-delete-button" onClick={()=>{handleDelete(val.CommentID)}}><IconContext.Provider value={iconProperties}><MdDelete></MdDelete></IconContext.Provider></div>:null}
                            <div className="comment-report-button" onClick={()=>{handleReport(val.CommentID)}}><IconContext.Provider value={{...iconProperties,color:"red"}}><MdReport></MdReport></IconContext.Provider></div>
                            {correctUser?<div className="comment-edit-button" onClick={()=>{handleEditComment(val.CommentID)}}><IconContext.Provider value={iconProperties}><VscEdit></VscEdit></IconContext.Provider></div>:null}
                        </div>:
                        null}
                    </div>
                })}
        </div>  }   
        </div>;
    }
    return <div>Loading...</div>;
}