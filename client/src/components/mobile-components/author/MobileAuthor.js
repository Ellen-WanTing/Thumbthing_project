import React from 'react';

import {useHistory} from 'react-router-dom';


import './MobileAuthor.css';

export default function MobileAuthor(props){
    // const [author,setAuthor] = useState(null);
    const history = useHistory();    
        
    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/author`).then((res)=>{
    //         setAuthor(res.data);
    //     })
    // },[]);
    const author = props.data;
    function goToAuthor(authorid){
        console.log(authorid)
        history.push("/author/"+authorid);
    }
    
    if(author!==null){        
        return <div id="author-container" className="mobile-container">
            {author.map((val)=>{                    
                if(val!==null)            
                    return<div className="author-item" key={val.AuthorID} onClick={()=>{goToAuthor(val.AuthorID)}}>{val.FullName}</div>
                else return null;
            })}
        </div>;
    }
    return <div>Loading...</div> 
}
export {MobileAuthor};