import { Button, Card, Stack, Modal} from "react-bootstrap"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import "./component-styles/ProjectContainer.css"
import ProjectForm from "./ProjectForm"

const ProjectContainer = () => {

    const [show, setShow] = useState(false)
    const [projects, setProjects] = useState([])
    const [ID, setID] = useState(1)
    const [deleteID, setDeleteID] = useState(0)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    
    const handleDelete = () => {
        let ind = 0 
        for (let project of projects) {
            if (project.id === deleteID) {
                projects.splice(ind, 1)
                setDeleteID(0)
                setProjects([...projects])
                break
            }
    
            ind += 1
        }
    }

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
                        <ProjectForm projects={projects} setProjects={setProjects} handleClose={handleClose} ID={ID} setID={setID}></ProjectForm>
                    </Modal.Body>
                </Modal>
                {deleteID ? handleDelete() : null}
                {projects ? projects.map((project) => <ProjectCard key={project.id} project={project} setDeleteID={setDeleteID}></ProjectCard>) : null}
            </Stack>
    )

}

export default ProjectContainer