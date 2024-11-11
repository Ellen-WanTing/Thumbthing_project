import React,{useState} from 'react';

import { Redirect, useHistory, useParams } from 'react-router-dom';

import "./MobileEditSummary.css"

import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import { IconContext } from "react-icons";
import {VscEdit} from 'react-icons/vsc';

import {withRouter} from 'react-router-dom';

function MobileEditSummary(props){

  const [value, setValue] = useState(props.data.SummaryText);
  const [redirect, setRedirect] = useState(false)                        
  const {id} = useParams();  
  const history = useHistory()            

  function handleChange(event) {
    setValue(event.target.value);
  }
      
  function handleSubmit(event) {      
    var token = localStorage.getItem("token");
        if(token!==undefined && token!==null){
            token = jwt_decode(token)
        }  
        props.put(`http://localhost:8000/api/summary/${id}`,{
          userID:token?token.userID:-1,          
          summary:value
        });
        
        setRedirect(true);
        event.preventDefault();
    }                  
        if(redirect){
        history.replace("/book/"+props.BookID);
        }
        var iconProperties = {size:"20px",color:"blue",padding:"5px"} 

        return (<React.Fragment>
        <div>Edit a Summary</div>
          <form className="summary-add-form" onSubmit={handleSubmit}>            
            <textarea className="summary-add-text" value={value} onChange={handleChange} />            
            <div onClick={handleSubmit}><IconContext.Provider value={iconProperties}><VscEdit></VscEdit></IconContext.Provider></div>
          </form>
          </React.Fragment>
        );    
}
export {MobileEditSummary};
export default withRouter(MobileEditSummary);