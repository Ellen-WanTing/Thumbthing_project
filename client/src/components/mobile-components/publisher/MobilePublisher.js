import React from 'react';

import {useHistory} from 'react-router-dom';


import './MobilePublisher.css';

export default function MobilePublisher(props){    

    // const [publisher,setPublisher] = useState(null);
    const history = useHistory();

    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/publisher`).then((res)=>{
    //         setPublisher(res.data);
    //     })
    // })
    function goToPublisher(id){
        history.push("/publisher/"+id)
    }

    const publisher = props.data;

    if(publisher!==null){        
        return <div className="mobile-container" id="publisher-container">
            {publisher.map((val)=>{                    
                if(val!==null)            
                    return<div className="publisher-item" key={val.PublisherID} onClick={()=>{goToPublisher(val.PublisherID)}}>{val.FullName}</div>
                return null;
            })}
        </div>;
    }
    return <div className="container">Loading...</div>    
}

export {MobilePublisher} ;