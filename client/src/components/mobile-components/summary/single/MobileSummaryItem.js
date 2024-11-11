import React from 'react';
import MobileSummaryButtons from '../buttons/MobileSummaryButtons';
import './MobileSummaryItem.css';

export default function MobileSummaryItem(props){   
    
    var data = props.data;           
    
    return <div className="summary-item-container" key={data.SummaryID}>
        <div className = "summary-text">
            {data.SummaryText.slice(0,140)}
        </div>
        
        <MobileSummaryButtons 
            LikeNum={data.LikeNum}
            SummaryID={data.SummaryID}  
            SummaryUserID={data.UserID} 
            BookID={data.BookID} 
            UserID={props.UserID} 
            readmore/>
    </div>        
}