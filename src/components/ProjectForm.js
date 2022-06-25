import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import "./component-styles/ProjectForm.css"

const ProjectForm = ( { projects, setProjects, handleClose }) => {
    
    const [errors, setErrors] = useState({})

    const onChange = (field) => {
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const getTime = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date()

        const month = months[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        const time = date.toLocaleString('en-US').split(", ")[1]
        return `Created: ${month} ${day}, ${year}\t- ${time}`
    }

    // Create Post function 
    async function createPost(data) {
        const response = await fetch("/api/create-project", {
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
            title: form[0].value,
            description: form[1].value,
            language: form[2].value,
            is_open: true,
            time: getTime()
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

        const response = createPost(data)
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Count Not Create Project")
                return
            }
        }).then((json_data)=> {
            // Add project 
            data.id = json_data.id
            setProjects([...projects, data])
            handleClose()
        })
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