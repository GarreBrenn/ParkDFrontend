function checkCookieExists(){ // ARE THEY LOGGED IN CHECK
    if(document.cookie.split(';').some((item) => item.trim().startsWith('email='))){
        console.log("THE USER HAS A COOKIE. THEY ARE LOGGED IN.");        
        return true;
    }
    else{
        console.log("THE USER HAS TO LOGIN")
        return false;
    }
}

export default checkCookieExists;
