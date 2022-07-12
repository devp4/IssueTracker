import { useState } from "react"
import { Button, Modal, InputGroup, Form, Card} from "react-bootstrap"
import "./component-styles/Group.css"

const Group = () => {
    const [joinShow, setjoinShow] = useState(false)
    const [groups, setGroups] = useState([])

    return(
        <div className="group-div">
            <Button className="create-group-btn">Create Group</Button>
            <Button className="join-group-btn" onClick={() => setjoinShow(true)}>Join Group</Button>

            <Modal show={joinShow} onHide={() => setjoinShow(false)}>
                <Modal.Header closeButton>
                    Join Group
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control placeholder="Group Code">
                        </Form.Control>
                    </InputGroup>
                    <Button className="join-btn">Join Group</Button>
                    <Card.Header className="group-header">Available Groups</Card.Header>
                    {groups ? groups.map((group) => <Card.Title className="card-join-title">{group.title}<Button className="card-join-btn">Join</Button></Card.Title>): null}
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Group