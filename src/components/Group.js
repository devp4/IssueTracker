import { useState } from "react"
import { Button, Modal, InputGroup, Form, Card, Row, Col} from "react-bootstrap"
import "./component-styles/Group.css"

const Group = ( { user, setGroup }) => {
    
    const [createShow, setcreateShow] = useState(false)
    const [joinShow, setjoinShow] = useState(false)

    const [leaveShow, setleaveShow] = useState(false)
    const [leavingGroup, setleavingGroup] = useState(null)

    const [groups, setGroups] = useState([])
    const [validCode, setvalidCode] = useState(false)

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
                alert("Could Not Create Group")
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
                alert("Could Not Get Groups")
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


    // Leaving functions 
    const handleGroupSplice = () => {
        let ind = 0
        for (let group of groups) {
            if (group.id === leaveGroup.id) {
                groups.splice(ind, 1)
                setGroups([...groups])
                break
            }

            ind += 1
        }
    }

    const leaveGroup = (group) => {
        setleavingGroup(group)
        setjoinShow(false)
        setleaveShow(true)
    }

    const handleLeaveCancel = () => {
        setleavingGroup(null)
        setleaveShow(false)
        setjoinShow(true)
    }

    async function deleteGroup() {
        const response = await fetch(`/api/delete-group/${leavingGroup.group_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
    
        return response
    }

    const handleLeave = () => {
        const response = deleteGroup()
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Could Not Delete Group")
                return
            }
        }).then((groups)=> {
            // Set groups
            if (groups) {
                handleGroupSplice()
                setleaveShow(false)
                setjoinShow(true)
            }
        })
    }

    async function isCodeValid() {
        let checkCode = document.getElementById("join-group-inp").value

        const response = await fetch(`/api/check-group/${checkCode}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
    
        return response
    }

    const checkCode = () => {
        const response = isCodeValid()
        response.then((response) => {
            // Check if response was valid
            if (response.status === 200) {
                return response.json()
            }
            else {
                alert("Could Not Check Group")
                return
            }
        }).then((data)=> {
            if (data) {
                if (data["status"]) {
                    console.log(data)
                    let already_joined = false
                    for (let group of groups) {
                        if (group["group_id"] === data["id"]) {
                            already_joined = true
                            break
                        }
                    }

                    if (!already_joined) {
                        let info = {
                            user_id: user.id,
                            name: data["name"]
                        }
                        const response = createGroup(info)
                        response.then((response) => {
                            // Check if response was valid
                            if (response.status === 200) {
                                return response.json()
                            }
                            else {
                                alert("Could Not Create Group")
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

                    joinGroup(data["id"])
                }
            }
        })
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
                    <InputGroup className="mb-3">
                        <Form.Control id="join-group-inp" placeholder="Group Code"></Form.Control>
                    </InputGroup>
                    <Button className="join-btn" onClick={checkCode}>Join Group</Button>
                    <Card.Header className="group-header">Available Groups</Card.Header>
                    {groups ? groups.map(
                        (group) => 
                            <Card.Title key={group.group_id} className="card-join-title">{group.name}
                                <Button className="card-leave-btn" onClick={() => leaveGroup(group)}>Leave</Button>
                                <Button className="card-join-btn" onClick={(() => joinGroup(group.group_id))}>Join</Button>
                            </Card.Title>): null}
                </Modal.Body>
            </Modal>

            <Modal show={leaveShow} onHide={() => setleaveShow(false)}>
                <Modal.Header>
                    Leaving {leavingGroup ? leavingGroup.name : "Group"}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Are you sure you want to leave this group?</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Button className="delete-proj-btn" onClick={handleLeave}>Leave</Button>
                                </Col>
                                <Col>
                                    <Button className="cancel-proj-btn" onClick={handleLeaveCancel}>Cancel</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Group