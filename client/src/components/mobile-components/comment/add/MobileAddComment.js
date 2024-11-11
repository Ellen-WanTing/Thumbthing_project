import {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';

import { IconContext } from "react-icons";
import {GrAdd,GrEdit} from 'react-icons/gr';
import {MdCancel} from 'react-icons/md';

import './MobileAddComment.css';
import jwt_decode  from 'jwt-decode';

export default function MobileAddComment(props){
    let [value,setValue] = useState('');

    const addCommentToDatabase = ()=>{        

        var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){
            token = jwt_decode(token)
        }
        axios.post("http://localhost:8000/api/comment",{
            userID:token?token.userID:-1,
            summaryID:props.summaryID,
            comment:value},
            {headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((res)=>{            
            toast("Comment Successfully Added!");
            props.hideAddComment();
            window.location.reload();
        }).catch((err)=>{
            toast("ERROR Occured in adding!");
        })
    }

    const editComment = ()=>{
        axios.put("http://localhost:8000/api/comment/"+props.commentID,{
            comment:value},
            {headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((res)=>{            
            toast("Comment Edited!");
            props.hideAddComment();
            window.location.reload();
        }).catch((err)=>{
            toast("ERROR Occured!");
        })
    }
    const edit = props.commentID!==undefined;

    useEffect(() => {
        if(edit){
            axios.get("http://localhost:8000/api/comment/"+props.commentID,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{                
                    setValue(res.data[0].Text);
            })
        }        
    }, [])
    
    var iconProperties = {size:"20px",color:"blue",padding:"5px"} ;

    return <div id="add-comment-container">
        <textarea value={value} id="comment-text-area" onChange={(e)=>{setValue(e.target.value)}}></textarea>
        <div id="add-comment-buttons-container">
            <div id="comment-add-button" onClick={!edit?addCommentToDatabase:editComment}>
                <IconContext.Provider value={iconProperties}>{!edit?<GrAdd/>:<GrEdit/>}</IconContext.Provider>
            </div>
            <div id="comment-cancel-button" onClick={()=>{props.hideAddComment()}}><IconContext.Provider value={{...iconProperties,color:"red"}}><MdCancel></MdCancel></IconContext.Provider></div>
        </div>
    </div>;
}