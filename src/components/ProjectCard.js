import {Card, Badge, Row, Col} from "react-bootstrap"

const ProjectCard = ({ project }) => {

    const getDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date()

        const month = months[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        const time = date.toLocaleString('en-US').split(", ")[1]
        return `Created: ${month} ${day}, ${year}\t- ${time}`
    }

    return (
        <Card>
            <Card.Header>{project.title}
                <Badge className="language-badge" pill bg="">{project.language}
                </Badge>{' '}
                <Badge className="issue-badge" pill bg="">Issues
                    <Badge className="issue-number" bg="">9</Badge>
                </Badge>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {project.description} 
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="row-footer">
                    <Col>
                        <Card.Text className="left-footer">
                            {getDate()}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className="right-footer">
                            By: Test Author
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )

}

export default ProjectCard