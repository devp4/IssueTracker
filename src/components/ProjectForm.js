import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import "./component-styles/ProjectForm.css"

const ProjectForm = ( { projects, setProjects, handleClose, ID, setID}) => {
    
    const [errors, setErrors] = useState({})

    const onChange = (field) => {
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const getFormData = (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            id: ID,
            title: form[0].value,
            description: form[1].value,
            language: form[2].value,
            status: "Open"
        }
        
        // Error Validation
        let foundError = false
        if (data.title === "" || !data.title) {
            errors.title = "Please enter a project name."
            foundError = true
        }

        if (data.description === "" || !data.description) {
            errors.description = "Please enter a project description."
            foundError = true
        }

        if (foundError) {
            setErrors({...errors})
            return
        }

        setProjects([...projects, data])
        setID(prevID => prevID + 1)
        handleClose()
    }

    return (
        <Form onSubmit={getFormData}>
            <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Project Name" 
                    spellCheck="false" 
                    onChange={() => onChange("title")}
                    isInvalid={!!errors.title}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea" 
                    placeholder="Project Description" 
                    rows={4} 
                    spellCheck="false"
                    onChange={() => onChange("description")}
                    isInvalid={!!errors.description}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="language">
                <Form.Label>Language</Form.Label>
                <Form.Control type="text" placeholder="Project Language" spellCheck="false"></Form.Control>
            </Form.Group>
            <Button className="submit-btn" type="submit">Submit</Button>
        </Form>

    )
}

export default ProjectForm