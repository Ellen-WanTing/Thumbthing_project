import axios from 'axios';

import {toast} from 'react-toastify';

import React,{useState,useEffect} from 'react';
import LoadingComponent from './LoadingComponent';
import { useUserID } from './useUserID';

export default function ApiHelper(props){   
    
    const [data, setData] = useState(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);            
  
    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    let userID = useUserID();

    useEffect(()=>{
        window.addEventListener('resize', handleWindowSizeChange);
        return ()=>{
            window.removeEventListener('resize', handleWindowSizeChange);            
        }
    },[])

    const fetch = (url)=>{      
        url = url?url:props.URL;          
        axios.get(url,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{  
            console.log(res)          ;
            if(props.singledata!==undefined)
                setData(res.data[0]);
            else 
                setData(res.data);
            console.log("get successful!",url);
        }).catch((err)=>{console.log("get failed!",url,err)});
    }

    useEffect(()=>{
        if(props.get!==undefined){                        
            fetch(props.URL);            
        }        
    },[]);
    

    const post = (url,parameters)=>{
        var x = {headers:{Authorization:"Bearer "+localStorage.getItem("token")}}
        console.log(x);
        axios.post(url,parameters?{...parameters}:{},x).then(()=>{
            if(props.toastMessage!==undefined)
                toast(props.toastMessage)            
            console.log("post successful");
        }).catch((err)=>{
            if(props.toastError!==undefined)
                toast(props.toastError);
        })
    }

    const put =  (url,parameters)=>{
        axios.put(url,parameters?{...parameters}:{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(()=>{
            if(props.toastMessage!==undefined)
                toast(props.toastMessage)            
            console.log("post successful");
        }).catch((err)=>{
            if(props.toastError!==undefined)
                toast(props.toastError);
        })
    }

    const del = (url,parameters)=>{
        axios.delete(url,parameters?{...parameters}:{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(()=>{
            if(props.toastMessage!==undefined)
                toast(props.toastMessage)            
            console.log("post successful");
        }).catch((err)=>{
            if(props.toastError!==undefined)
                toast(props.toastError);
        })
    }
    if(props.get && (data===null || data===undefined)){
        return <React.Fragment><LoadingComponent></LoadingComponent></React.Fragment>
    }
    if(windowWidth<=550)
        return <props.MobileComponent key={props.childkey?props.childkey:"mobilecomponent"} data={data} fetch={fetch} post={post} put = {put} delete = {del} UserID={userID} {...props.props}></props.MobileComponent>;    
    else 
        return <props.TabletComponent key="tabletComponent" data={data}  fetch={fetch} post={post} put = {put} delete = {del} UserID={userID} {...props.props}></props.TabletComponent>;


}

export {ApiHelper};