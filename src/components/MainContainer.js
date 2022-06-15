import { Container, Row, Col } from "react-bootstrap"
import "./component-styles/MainContainer.css"
import ProjectContainer from "./ProjectContainer"
import IssuesContainer from "./ProjectContainer"

const MainContainer = () => {
    return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <ProjectContainer></ProjectContainer>
                    </Col>
                    <Col sm={6}>
                        <IssuesContainer></IssuesContainer>
                    </Col>
                </Row>
            </Container>
    )

}

export default MainContainer