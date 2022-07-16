import { Container, Row, Col } from "react-bootstrap"
import "./component-styles/MainContainer.css"
import IssueContainer from "./IssueContainer"
import ProjectContainer from "./ProjectContainer"

const MainContainer = ({ user, group }) => {
    return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <ProjectContainer user={user} group={group}></ProjectContainer>
                    </Col>
                </Row>
            </Container>
    )

}

export default MainContainer