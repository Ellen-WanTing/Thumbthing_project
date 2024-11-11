import React from 'react';

import './MobilePaginationButton.css';

export default function MobilePaginationButton(props){
    return <div className={"mobile-pagination-button"} onClick={props.onClick} style={props.style}>{props.content}</div>    
}