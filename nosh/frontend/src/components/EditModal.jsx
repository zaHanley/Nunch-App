import { useState } from "react";
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";

export default function EditModal({
  show,
  handleClose,
  section,
  recipe,
  category,
  id,
  setShowModal,
  showModal,
}) {
  const [name, setName] = useState('');
  // define other state variables for form fields as necessary
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/${category}s`, {
        name: name,
        id: id,
        // add other form fields here as necessary
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    // setShowModal(false)
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => handleSubmit()}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
