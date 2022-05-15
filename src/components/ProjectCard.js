import { Card, Badge, Row, Col, Button, Modal } from "react-bootstrap"
import { ProjectEditForm, ProjectDeleteForm } from "./ProjectToolForms"
import { useState } from "react"
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs"
import { IconContext } from "react-icons"

const ProjectCard = ({ project, setDeleteID }) => {

    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)

    const handleEditShow = () => setEditShow(true)
    const handleEditClose = () => setEditShow(false)

    const handleDeleteShow = () => setDeleteShow(true)
    const handleDeleteClose = () => setDeleteShow(false)

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
            <Modal show={editShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    Editing {project.title}
                </Modal.Header>
                <Modal.Body>
                    <ProjectEditForm project={project} handleEditClose={handleEditClose}></ProjectEditForm>
                </Modal.Body>
            </Modal>
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header>
                    Deleting {project.title}
                </Modal.Header>
                <Modal.Body>
                    <ProjectDeleteForm project={project} handleDeleteClose={handleDeleteClose} setDeleteID={setDeleteID}></ProjectDeleteForm>
                </Modal.Body>
            </Modal>
            <Card.Header>{project.title}
                <Badge className="language-badge" pill bg="">{project.language}
                </Badge>{' '}
                <Badge className="issue-badge" pill bg="">Issues
                    <Badge className="issue-number" bg="">9</Badge>
                </Badge>
                <Button className="delete-btn" onClick={handleDeleteShow}>
                    <IconContext.Provider value={{ color: "#8663f7", className: "delete-icon", size: 27 }}>
                        <BsFillTrashFill />
                    </IconContext.Provider>
                </Button>
                <Button className="edit-btn" onClick={handleEditShow}>
                    <IconContext.Provider value={{ color: "#8663f7", className: "edit-icon", size: 27 }}>
                        <BsPencilSquare />
                    </IconContext.Provider>
                </Button>
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