import { Nav, Navbar } from "react-bootstrap"
import { IconContext } from "react-icons";
import { BsBugFill } from "react-icons/bs";
import "./component-styles/NavBar.css"

const NavBar = () => {
    return (    
        <Navbar className="nav" variant="dark">
            <Navbar.Brand>
                <IconContext.Provider value={{color: "#383799", className: "bug-icon", size: 30}}>
                    <BsBugFill/>
                </IconContext.Provider>
                Issue Tracker
            </Navbar.Brand>
        </Navbar>
    )

}

export default NavBar