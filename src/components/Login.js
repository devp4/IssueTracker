import "./component-styles/Login.css"
import { auth, provider } from "../firebase-tools"
import { signInWithPopup } from "firebase/auth"

const Login = ({ setUser }) => {

    async function createUser(data) {
        const response = await fetch("/api/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    
        return response
    }
            
    const handleUser = () => {
        // Get user from Google Authentication and store in database 
        
        signInWithPopup(auth, provider)
            .then((result) => {
                // Format data
                var data = {
                    "id": result.user.uid,
                    "email": result.user.email,
                    "username": result.user.displayName,
                }  
                
                // Store user in database
                const response = createUser(data)
                response.then((response) => {
                    // Check if response was valid
                    if (response.status === 200) {
                        return response.json()
                    }
                    else {
                        alert("Count Not Create User")
                        return
                    }
                }).then((user_data)=> {
                    // Set User
                    setUser(user_data)
                })
            })
            
            // If error (clicks off) set user to null
            .catch((error) => {
                setUser(null)
            })
    }

    return(
        <div className="login-div">
            <h1 className="login-h1">Issue Tracker</h1>
            <h3 className="fade-in">Easily track issues for your projects</h3>
            <button className="signin-btn" onClick={handleUser}>Sign In</button>
        </div>
    )

}

export default Login