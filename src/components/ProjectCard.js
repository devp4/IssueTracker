import {Card, Badge, Row, Col} from "react-bootstrap"

const ProjectCard = () => {
    return (
        <Card>
            <Card.Header>Test Project Title 
                <Badge className="language-badge" pill bg="">Python
                </Badge>{' '}
                <Badge className="issue-badge" pill bg="">Issues
                    <Badge className="issue-number" bg="">9</Badge>
                </Badge>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    This is where the description will go 
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="row-footer">
                    <Col>
                        <Card.Text className="left-footer">
                            Created: May 12 2022   
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className="right-footer">
                            Author: Test Author
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )

}

export default ProjectCard