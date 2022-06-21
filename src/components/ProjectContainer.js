import { Button, Card, Stack, Modal, Pagination, Row, Col, Container } from "react-bootstrap"
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IconContext } from "react-icons"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import "./component-styles/ProjectContainer.css"
import ProjectForm from "./ProjectForm"


const ProjectContainer = () => {

    const [show, setShow] = useState(false)
    const [projects, setProjects] = useState([])
    const [deleteID, setDeleteID] = useState(0)
    const [page, setPage] = useState(0)

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

    const handlePage = (direction) => {
        if (direction === "fast-forward") {
            const rem = projects.length % 3 

            if (projects.length !== 0 && rem === 0) {
                setPage(projects.length - 3)
            }

            else {
                setPage(projects.length - rem)
            }
        }
        
        else if (direction === "fast-backward") {
            setPage(0)
        }

        else if (direction === "forward") { 
            if (page + 3 < projects.length) {      
                setPage(currentPage => currentPage + 3)
            }
        }

        else if (direction === "back") { 
            if (page - 3 >= 0) {      
                setPage(currentPage => currentPage - 3)
            }
        }

    }

    return (
        <Stack>
            <Card.Header className="project-header">Projects
                <Button className="project-btn" onClick={handleShow}>Add Project</Button>
            </Card.Header>
            <Container className="page-cont">
                <Row className="page-row">
                    <Col className="page-col">
                        <Pagination className="page-left">
                            <Pagination.Item onClick={() => handlePage("fast-backward")}>
                                <IconContext.Provider value={{ color: "white", size: 35 }}>
                                    <BsChevronDoubleLeft></BsChevronDoubleLeft>
                                </IconContext.Provider>
                            </Pagination.Item>
                        </Pagination>
                    </Col>
                    <Col className="page-col">
                        <Pagination className="page-left">
                            <Pagination.Item onClick={() => handlePage("back")}>
                                <IconContext.Provider value={{ color: "white", size: 35 }}>
                                    <BsChevronLeft></BsChevronLeft>
                                </IconContext.Provider>
                            </Pagination.Item>
                        </Pagination>
                    </Col>
                    <Col className="page-col">
                        <Pagination className="page-right">
                            <Pagination.Item onClick={() => handlePage("forward")}>
                                <IconContext.Provider value={{ color: "white", size: 35 }}>
                                    <BsChevronRight></BsChevronRight>
                                </IconContext.Provider>
                            </Pagination.Item>
                        </Pagination>
                    </Col>
                    <Col className="page-col">
                        <Pagination className="page-right">
                            <Pagination.Item onClick={() => handlePage("fast-forward")}>
                                <IconContext.Provider value={{ color: "white", size: 35}}>
                                    <BsChevronDoubleRight></BsChevronDoubleRight>
                                </IconContext.Provider>
                            </Pagination.Item>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Create Project
                </Modal.Header>
                <Modal.Body>
                    <ProjectForm projects={projects} setProjects={setProjects} handleClose={handleClose}></ProjectForm>
                </Modal.Body>
            </Modal>
            {deleteID ? handleDelete() : null}
            {projects ? projects.slice(page, page+3).map((project) => <ProjectCard key={project.id} project={project} setDeleteID={setDeleteID}></ProjectCard>) : null}
        </Stack>
    )

}

export default ProjectContainer