import { Nav, Navbar } from "react-bootstrap"
import "./component-styles/NavBar.css"

const NavBar = () => {
    return (    
        <Navbar className="nav" variant="dark">
            <Navbar.Brand>
                Issue Tracker
            </Navbar.Brand>
            <Nav>
                <Nav.Link>
                    TEST LINK
                </Nav.Link>
            </Nav>
        </Navbar>
    )

}

export default NavBar