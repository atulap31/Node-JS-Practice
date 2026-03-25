import { getAllUsers } from "../features/user/model/user.model";

const basicAuthorizer = (req, res, next) => {
    // Check if authorization header is empty
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }else{
        console.log(authHeader);
    }

    //Extract credentials.
    const base64Credentials = authHeader.replace("Basic", " ");
    console.log(base64Credentials); 

    //Decode credentials.
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds); //[usename:password]
    const creds = decodedCreds.split(':'); // [username, password]

    const user = getAllUsers().find(u => u.email == creds[0] && u.password == creds[1]);
    
    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;