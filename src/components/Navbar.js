import { Navbar, OverlayTrigger, Button, Tooltip } from "react-bootstrap"
import { IconContext } from "react-icons";
import { BsBugFill } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import "./component-styles/NavBar.css"

const NavBar = ( { setGroup }) => {
    return (    
        <Navbar className="nav" variant="dark">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Groups</Tooltip>}>
                <Button className="group-home-btn" onClick={() => setGroup(null)}>
                    <IconContext.Provider value={{ color: "#5755ed", className: "delete-icon", size: 35}}>
                        <BsFillHouseDoorFill/>
                    </IconContext.Provider>
                </Button>
            </OverlayTrigger>
            <Navbar.Brand>
                <IconContext.Provider value={{color: "#5755ed", className: "bug-icon", size: 30}}>
                    <BsBugFill/>
                </IconContext.Provider>
                Issue Tracker
            </Navbar.Brand>
        </Navbar>
    )

}

export default NavBar