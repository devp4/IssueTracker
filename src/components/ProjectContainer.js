import { Button, Card, Stack, Modal} from "react-bootstrap"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import "./component-styles/ProjectContainer.css"
import ProjectForm from "./ProjectForm"

const ProjectContainer = () => {

    const [show, setShow] = useState(false)
    const [projects, setProjects] = useState([])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
            <Stack>
                <Card.Header className="project-header">Projects
                    <Button className="project-btn" onClick={handleShow}>Add Project</Button>
                </Card.Header>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        Create Project
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectForm projects={projects} setProjects={setProjects} handleClose={handleClose}></ProjectForm>
                    </Modal.Body>
                </Modal>
                {projects ? projects.map((project) => <ProjectCard project={project}></ProjectCard>) : null}
                {console.log(projects)}
            </Stack>
    )

}

export default ProjectContainer