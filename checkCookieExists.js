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

function getUserID() {
    var uri = document.cookie;
    console.log(uri);
    var decodedEmail = decodeURIComponent(uri);
    console.log(decodedEmail);
    var emailSubstring = decodedEmail.substring(6);
    console.log(emailSubstring);
    return (emailSubstring)
    //return (document.cookie.split(';')[1].trim().substr(6).replace("%40","@"));
}
// const userID = document.cookie.split(';')[1].trim().substr(6).replace("%40","@");

export { checkCookieExists, getUserID };