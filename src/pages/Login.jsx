import LoginForm from "../componants/LoginForm"

function Login(){
    console.log(process.env.NODE_ENV)
    console.log(process.env.REACT_APP_BASE_URL)
    
    return(
       <LoginForm>

       </LoginForm>
    )
}

export default Login;