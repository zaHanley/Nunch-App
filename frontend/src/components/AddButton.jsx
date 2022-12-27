import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from '../pages/TestBook'

const AddButton = ({buttonType, cookbookId, sectionId}) => {
    const {getAllInfo, getAllSections} = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setInputValue(e.target.value);

  const addItem = async () => {
    if (cookbookId === 'new') {
        const response = await axios.post(`/api/${buttonType}s/`, {'name': inputValue})
        .catch(function (error) {
            console.error(error);
          });
    } else {
        const response = await axios.post(`/api/${buttonType}s`, {
            'cookbookId': cookbookId, 
            'sectionId': sectionId,
            'name': inputValue
        })
        .catch(function (error) {
            console.error(error);
          });
    }
    
      
  };

  const handleSubmit = (e) => {
    
    // e.preventDefault();
    addItem();
    setTimeout(function () {
        getAllInfo()
    }, 400)
    
    handleClose();
  };

  return (
    <>
      <Button variant="dark mb-2" onClick={handleShow} size="sm">
        add {buttonType}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a {buttonType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="url">Name:</label>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder={`Enter ${buttonType} name`}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={async () => handleSubmit()}
              on
              type="submit"
              className="btn btn-dark"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddButton;