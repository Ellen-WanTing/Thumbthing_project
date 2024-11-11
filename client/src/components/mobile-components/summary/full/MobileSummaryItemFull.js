import React,{useState} from 'react';
import './MobileSummaryItemFull.css';
import {useParams} from 'react-router-dom';


import MobileSummaryLabel from '../label/MobileSummaryLabel';
import MobileSummaryButtons from '../buttons/MobileSummaryButtons';
import MobileCommentList from '../../comment/list/MobileCommentList';
import MobileAddComment from '../../comment/add/MobileAddComment';

export default function MobileSummaryItemFull(props){    
    let {id} = useParams();        
    
    const summary = props.data;
    
    const [showAddComment,setShowAddComment] = useState(false);
    
    const addComment = () => {
        setShowAddComment(true);
    };
    
    const hideAddComment = ()=>{
        setShowAddComment(false);
    }

    if(summary!==null)
        return <div className="summary-full-container" key={summary.SummaryID}>
            <MobileSummaryLabel BookID={props.BookID} UserID={props.UserID} text="Summary"></MobileSummaryLabel>
            <div id="summary-full-text-button-container">                
                <div className = "summary-full-text">
                    {summary.SummaryText}
                </div>     
                <MobileSummaryButtons SummaryID={summary.SummaryID} SummaryUserID={summary.UserID} BookID={props.BookID} UserID={props.UserID} LikeNum={summary.LikeNum} addComment={addComment}></MobileSummaryButtons>            
            </div>
            {showAddComment?<React.Fragment><div id="add-comment-label">Add a comment:</div><MobileAddComment summaryID={summary.SummaryID} hideAddComment={hideAddComment}></MobileAddComment></React.Fragment>:null}
            <MobileCommentList UserID={props.UserID} SummaryUserID={summary.UserID} SummaryID={id}></MobileCommentList>            
        </div>     
    return <div>Loading...</div>       
}

export {MobileSummaryItemFull};