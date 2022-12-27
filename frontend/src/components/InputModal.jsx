import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {NewRecipeContext} from '../pages/CreateRecipe'

export default function InputModal({category, state, setState}) {
const {ingredients, setIngredients} = useContext(NewRecipeContext)
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const handleClose = () => {
    setState(inputValue)
    setShow(false)
    
};
  const handleShow = () => setShow(true);
  const handleChange = (e) => setInputValue(e.target.value)

  return (
    <>
      <Button variant="dark mb-1" size="sm" onClick={handleShow}>
        Add {category}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>List {category}</Form.Label>
              <Form.Control as="textarea" rows={15} onChange={handleChange} placeholder="" defaultValue={state}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}