import { Button, Card, Stack} from "react-bootstrap"
import ProjectCard from "./ProjectCard"
import "./component-styles/ProjectContainer.css"

const ProjectContainer = () => {
    return (
            <Stack>
                <Card.Header className="project-header">Projects
                    <Button className="project-btn">Add Project
                    </Button>
                </Card.Header>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
            </Stack>
    )

}

export default ProjectContainer