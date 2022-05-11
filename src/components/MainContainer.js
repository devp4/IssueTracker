import { Container, Row, Col } from "react-bootstrap"
import "./component-styles/MainContainer.css"
import ProjectContainer from "./ProjectContainer"

const MainContainer = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <ProjectContainer></ProjectContainer>
                </Col>
                <Col>STATS PAGE FOR LATER</Col>
            </Row>
        </Container>
    )

}

export default MainContainer