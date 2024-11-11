import jwt_decode  from 'jwt-decode';

export function useUserID(){
    var token = localStorage.getItem("token");
    if(token!==undefined && token!==null && token!=="undefined"){
        token = jwt_decode(token)
    }  
    return token?token.userID:-1;
}