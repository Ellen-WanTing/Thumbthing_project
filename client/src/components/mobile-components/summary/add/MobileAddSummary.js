import React ,{useState} from 'react';

import { Redirect } from 'react-router-dom';
import { useUserID } from '../../../useUserID';

import "./MobileAddSummary.css"

export default function MobileAddSummary(props){
    
      const [value, setValue] = useState('')
      const [redirect, setRedirect] = useState(false)                         

      const userID = useUserID();

      function handleChange(event) {
        setValue(event.target.value);
      }
      
      function handleSubmit(event) {      
        
        props.post(`http://localhost:8000/api/summary`,{
          userID:userID,
          bookID:props.BookID,
          summary:value
        });
        
        setRedirect(true);
        event.preventDefault();
      }
          

        if(redirect){
            return <Redirect to={"/book/"+props.BookID}></Redirect>
        }

        return (<React.Fragment>
        <div>Add a Summary</div>
          <form className="summary-add-form" onSubmit={handleSubmit}>            
            <textarea className="summary-add-text" value={value} onChange={handleChange} />            
            <input className="summary-add-button" type="submit" value="+" />
          </form>
          </React.Fragment>
        );      
}

export {MobileAddSummary};