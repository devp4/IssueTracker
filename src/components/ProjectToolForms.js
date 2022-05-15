import { Form, Button, Row, Col} from "react-bootstrap"
import "./component-styles/ProjectForm.css"

export const ProjectEditForm = ( { project, handleEditClose}) => {

    const getFormData = (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            id: project.id,
            title: form[0].value,
            description: form[1].value,
            language: form[2].value
        }

        // Check Blanks
        if (data.title === "" || !data.title) {
            data.title = project.title
        }

        if (data.description === "" || !data.description) {
            data.description = project.description
        }

        if (data.language === "" || !data.language) {
            data.language = project.language
        }

        if (data.language === "DELETE") {
            data.language = null
        }

        project.title = data.title
        project.description = data.description
        project.language = data.language
        handleEditClose()
    }

    return (
        <Form onSubmit={getFormData}>
            <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="New Project Name" spellCheck="false">
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="New Project Description" rows={4} spellCheck="false">
                </Form.Control>
            </Form.Group>
            <Form.Group className="language">
                <Form.Label>Language</Form.Label>
                <Form.Control type="text" placeholder="New Project Language (DELETE to remove)" spellCheck="false"></Form.Control>
            </Form.Group>
            <Button className="apply-changes-btn" type="submit">Apply Changes</Button>
        </Form>

    )
}

export const ProjectDeleteForm = ({ project, handleDeleteClose, setDeleteID }) => {
    const handleDelete = () => {
        setDeleteID(project.id)
        handleDeleteClose()
    }
    
    return (
        <Form>
            <Form.Group>
                <Form.Label>Are you sure you want to delete this project?</Form.Label>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Button className="delete-proj-btn" onClick={handleDelete}>Delete</Button>
                    </Col>
                    <Col>
                        <Button className="cancel-proj-btn" onClick={handleDeleteClose}>Cancel</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}