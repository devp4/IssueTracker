import { Card, Badge, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap"
import { ProjectEditForm, ProjectDeleteForm } from "./ProjectToolForms"
import { useState } from "react"
import { BsPencilSquare, BsFillTrashFill, BsCaretRightFill } from "react-icons/bs"
import { IconContext } from "react-icons"

const ProjectCard = ({ project, setDeleteID }) => {

    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)

    const handleEditShow = () => setEditShow(true)
    const handleEditClose = () => setEditShow(false)

    const handleDeleteShow = () => setDeleteShow(true)
    const handleDeleteClose = () => setDeleteShow(false)
    
    const getLanguage = (language) => {
        if (language === "None") {
            return null
        }

        return language
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
                <Badge className="language-badge" pill bg="">{getLanguage(project.language)}
                </Badge>{' '}
                <Badge className="status-badge" id={project.id} pill bg="">{project.is_open ? "Open" : "Closed"}
                </Badge>{' '}
                <OverlayTrigger placement="top" overlay={<Tooltip>Issues</Tooltip>}>
                    <Button className="view-btn" onClick={handleEditShow}>
                        <IconContext.Provider value={{ color: "#8663f7", className: "delete-icon", size: 33 }}>
                            <BsCaretRightFill />
                        </IconContext.Provider>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                    <Button className="delete-btn" onClick={handleDeleteShow}>
                        <IconContext.Provider value={{ color: "#8663f7", className: "delete-icon", size: 27 }}>
                            <BsFillTrashFill />
                        </IconContext.Provider>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                    <Button className="edit-btn" onClick={handleEditShow}>
                        <IconContext.Provider value={{ color: "#8663f7", className: "edit-icon", size: 27 }}>
                            <BsPencilSquare />
                        </IconContext.Provider>
                    </Button>
                </OverlayTrigger>

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
                            {project.time}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className="right-footer">
                            {`By: ${project.created_by}`}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )

}

export default ProjectCard