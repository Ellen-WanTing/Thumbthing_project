import {Link,useLocation} from 'react-router-dom';
import './MobileSummaryLabel.css';
import {useLogin} from '../../../useLogin';

import {toast} from 'react-toastify';

export default function MobileSummaryLabel(props){
    const loggedIN = useLogin();

    const location = useLocation();

    return <div id="summary-label">{props.text}
    {
        props.showAddButton!==undefined?
        <div id="add-summary-button">
        {
            loggedIN?
            <Link to={"/book/"+props.BookID+"/addSummary"}>+</Link>:
            <Link to={{pathname:"/login",state:{from:location.pathname}}} onClick={()=>{toast("Log in first!")}}>+</Link>
        }
        </div>:
        null
    }
    </div>;
}