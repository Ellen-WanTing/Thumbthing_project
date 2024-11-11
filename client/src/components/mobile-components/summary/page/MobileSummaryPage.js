import React,{useEffect} from 'react';
import './MobileSummaryPage.css';

import MobileSummaryItem from '../single/MobileSummaryItem'
import MobileSummaryLabel from '../label/MobileSummaryLabel';
import LoadingComponent from '../../../LoadingComponent';

export default function MobileSummaryPage(props){          
    var summaries = props.data;
    useEffect(() => {
        setTimeout(()=>{props.fetch()},500)        
    }, []) 
    if(summaries===null)
        return <LoadingComponent/>;

      
    if(summaries.length<1)
        return <div id="summaries-container">
            <MobileSummaryLabel BookID={props.BookID} UserID={props.UserID} text="Summaries" showAddButton></MobileSummaryLabel>
            <div id="no-summary-div" key="no-summary-div">No Summaries yet. Press the + button to add a summary</div>                
        </div>
        
    return <div id="summaries-container">
        <MobileSummaryLabel BookID={props.BookID} UserID={props.UserID} text="Summaries" showAddButton></MobileSummaryLabel>
        {summaries.map((summary)=>{
            return <MobileSummaryItem key={summary.SummaryID} data={summary}  BookID={props.BookID} UserID={props.UserID}></MobileSummaryItem>
        })}            
    </div>    
}

export {MobileSummaryPage};