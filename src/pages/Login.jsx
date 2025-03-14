import SingleStringInputForm from "../componants/user/SingleStringInputForm"
import Auth from "../api/Auth";
import { useState } from "react";

function Login(){
    const [showCodeBox, setShowCodeBox] = useState(false)
    const [theUserEmail, setUserEmail] = useState("example@email.com")
    const authenticateUser = async (userEmail) => {
        const newUser = {
            userEmail: userEmail,
        };
        console.log(newUser.userEmail)

        try{
            const response = await Auth.authenticate(newUser)
            console.log(response)
            if(response.status === 200){
                console.log("response was ok")
            }
            if(response.status === 200){
                setUserEmail(newUser.userEmail);
                setShowCodeBox(true);
            }
        }
        catch(e){

        }
    }   
    const authorizeUser = async (userCode) => {
        const newUser = {
            userEmail: theUserEmail,
            userCode: userCode,
        };
        console.log(newUser.userCode)

        try{
            const response = await Auth.authorize(newUser)
            console.log(response)
            if(response.status === 200){
                console.log("user is authorized!");
                localStorage.setItem("authToken", response.data.token);
                console.log(localStorage.getItem("authToken"));
            }
        }
        catch(e){

        }
    }

    return(
        <>
        <div className="container-login">
            <div className="inner">
                <SingleStringInputForm executeFunction={authenticateUser} placeholder={"voorbeeld@email.nl"}/>
            </div>
        </div>
        {showCodeBox &&(
            <div>
                <div className="inner">
                    <SingleStringInputForm executeFunction={authorizeUser} placeholder={"123456"} />
                </div>
            </div>
        )}
        </>
    )
}

export default Login;