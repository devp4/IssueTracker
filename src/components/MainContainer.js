import { Container, Row, Col } from "react-bootstrap"
import "./component-styles/MainContainer.css"
import IssueContainer from "./IssueContainer"
import ProjectContainer from "./ProjectContainer"

const MainContainer = () => {
    return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <ProjectContainer></ProjectContainer>
                    </Col>
                </Row>
            </Container>
    )

}

export default MainContainer