import {Card, Button} from "react-bootstrap"

const ProjectCard = () => {
    return (
        <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    <Button variant="primary">Go somewhere</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default ProjectCard