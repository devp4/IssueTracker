import { useState } from "react"
import { Button, Modal, InputGroup, Form, Card} from "react-bootstrap"
import "./component-styles/Group.css"

const Group = ( { user, setGroup }) => {
    
    const [createShow, setcreateShow] = useState(false)
    const [joinShow, setjoinShow] = useState(false)
    const [groups, setGroups] = useState([])

    async function createGroup(data) {
        const response = await fetch("/api/create-group", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    
        return response
    }

    const handleGroup = (user) => {
        var data = {
            user_id: user.id,
            name: document.getElementById("create-group-inp").value
        }

        const response = createGroup(data)
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Count Not Create Group")
                return
            }
        }).then((group_info)=> {
            // Set User
            if (group_info) {
                setGroup(group_info.group_id)
                setcreateShow(false)
            }
        })
    }

    async function getGroups(user) {
        const response = await fetch(`/api/get-groups/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
    
        return response
    }


    const handleJoinGroups = (user) => {
        const response = getGroups(user)
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Count Not Get Groups")
                return
            }
        }).then((group_info)=> {
            // Set groups
            if (group_info) {
                setGroups([...group_info.groups])
                setjoinShow(true)
            }
        })
    }

    const joinGroup = (group_id) => {
        setGroup(group_id)
    }

    return(
        <div className="group-div">
            <Button className="create-group-btn" onClick={() => setcreateShow(true)}>Create Group</Button>
            <Button className="join-group-btn" onClick={() => handleJoinGroups(user)}>Join Group</Button>
            
            <Modal show={createShow} onHide={() => setcreateShow(false)}>
                <Modal.Header closeButton>
                    Create Group
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                            <Form.Control id="create-group-inp" placeholder="Group Name"></Form.Control>
                    </InputGroup>
                    <Button className="create-btn" onClick={() => handleGroup(user)}>Create Group</Button>
                </Modal.Body>
            </Modal>

            <Modal show={joinShow} onHide={() => setjoinShow(false)}>
                <Modal.Header closeButton>
                    Join Group
                </Modal.Header>
                <Modal.Body>
                    <InputGroup id="join-group-inp" className="mb-3">
                        <Form.Control placeholder="Group Code"></Form.Control>
                    </InputGroup>
                    <Button className="join-btn">Join Group</Button>
                    <Card.Header className="group-header">Available Groups</Card.Header>
                    {groups ? groups.map((group) => <Card.Title key={group.group_id} className="card-join-title">{group.name}<Button className="card-join-btn" onClick={() => joinGroup(group.group_id)}>Join</Button></Card.Title>): null}
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Group