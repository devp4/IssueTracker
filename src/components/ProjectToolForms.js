import { useState } from "react"
import { Form, Button, Row, Col} from "react-bootstrap"
import "./component-styles/ProjectForm.css"

export const ProjectEditForm = ( { project, handleEditClose}) => {

    const checkStatus = () => {
        if (project.is_open) {
            return false
        }
        
        else {
            return true
        }
    }
    
    const [checked, setChecked] = useState(() => checkStatus())

    const handleStatus = () => {
        if (project.is_open) {
            project.is_open = false
            document.getElementById("status-badge").style.backgroundColor = "#FF0000"
            document.getElementById("status-badge").innerHTML = "Closed"
        }

        else {
            project.is_open = true
            document.getElementById("status-badge").style.backgroundColor = "#008000"
            document.getElementById("status-badge").innerHTML = "Open"
        }
    }

    // Update Post function 
    async function updatePost(data) {
        const response = await fetch("/api/update-project", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    
        return response
    }

    const getFormData = (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            id: project.id,
            title: form[0].value,
            description: form[1].value,
            language: form[2].value,
            is_open: project.is_open
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
            data.language = "None"
        }

        const response = updatePost(data)
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Count Not Update Project")
                return
            }
        }).then((json_data)=> {
            // Add project 
            project.title = data.title
            project.description = data.description
            project.language = data.language
            handleEditClose()
        })
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
            <Form.Switch className="close-switch" type="switch" label={`Closed`} onClick={handleStatus} defaultChecked={checked}/>
            <Button className="apply-changes-btn" type="submit">Apply Changes</Button>
        </Form>

    )
}

export const ProjectDeleteForm = ({ project, handleDeleteClose, setDeleteID }) => {
    
    // Delete Post function 
    async function deletePost(id) {
        const response = await fetch(`/api/delete-project/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
    
        return response
    }

    const handleDelete = () => {
        const response = deletePost(project.id)
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200){
                // delete project 
                setDeleteID(project.id)
            }
            else {
                alert("Count Not Delete Project")
                return
            }
        })

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