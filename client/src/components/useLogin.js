import axios from 'axios';

import {useState} from 'react';

export function useLogin(){
    const [loggedIN, setLoggedIN] = useState(false);    
    var token = localStorage.getItem("token");
    if(token!==undefined && token!==null){
        axios.get("http://localhost:8000/api/userOnly",{
            headers:{Authorization:"Bearer "+token}
        }).then((res)=>{
            if(res.data==="Welcom User."){
                setLoggedIN(true);                                            
            }
        })
}                        
    return loggedIN;
}