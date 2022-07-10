import "./component-styles/Login.css"
import { auth, provider } from "../firebase-tools"
import { signInWithPopup } from "firebase/auth"

const Login = ({ setUser }) => {

    const getUser = () => {
        
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result)
                console.log(result)
            })
            .catch((error) => {
                setUser(null)
                console.log(error)
            })
    }

    return(
        <div className="login-div">
            <h1 className="login-h1">Issue Tracker</h1>
            <h3 className="fade-in">Easily track issues for your projects</h3>
            <button className="signin-btn" onClick={getUser}>Sign In</button>
        </div>
    )

}

export default Login