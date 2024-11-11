import React from 'react';

import {useHistory} from 'react-router-dom';


import './MobileCategory.css';

export default function MobileCategory(props){    

    // const [category,setCategory] = useState(null);
    const history = useHistory();

    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/category`).then((res)=>{
    //         setCategory(res.data);
    //     })
    // })

    var category = props.data;

    function goToCategory(id){
        history.push("/category/"+id)
    }
    if(category!==null){        
        return <div className="mobile-container" id="category-container">
            {category.map((val)=>{                    
                if(val!==null)            
                    return<div className="category-item" key={val.CategoryID} onClick={()=>{goToCategory(val.CategoryID)}}>{val.Name}</div>
                return null;
            })}
        </div>;
    }
    return <div className="mobile-container">Loading...</div>    
}

export {MobileCategory};