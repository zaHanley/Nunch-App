import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { UserContext } from "../pages/TestBook";
import AddButton from "./AddButton";
import EditModal from "./EditModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBContainer,
} from "mdb-react-ui-kit";

export default function TestNav({ getAllSections }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    allCookbooks,
    allSections,
    setAllSections,
    allRecipes,
    setAllRecipes,
    selectedCookbook,
    setSelectedCookbook,
    selectedSection,
    setSelectedSection,
    selectedRecipe,
    setSelectedRecipe,
  } = useContext(UserContext);

  const handleCookbookChange = (cookbook) => {
    setSelectedCookbook(cookbook);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleRecipeChange = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUpdate = (event) => {
    setShowModal(true);
  };
  // const handleUpdate = async (category) => {

  //     const res = await axios.put(`/api/${category}s`, {section_id: selectedSection.pk} )

  // }
  const handleDelete = async (category) => {
    if (category === "section") {
      const res = await axios.delete(`/api/${category}s`, {
        data: { section_id: selectedSection.pk },
      });
    } else if (category === "recipe") {
      const res = await axios.delete(`/api/${category}s`, {
        data: { recipe_id: selectedRecipe.pk },
      });
    } else if (category === 'cookbook') {
      const res = await axios.delete(`/api/${category}s/`, {
        data: {cookbook_id: selectedCookbook.pk}
      })
    }

    window.location.reload();
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`/api/${category}s`, {
        name: selectedCookbook.name,
        id: selectedCookbook.pk,
        // add other form fields here as necessary
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    // setShowModal(false)
    window.location.reload();
  }
  const handleCreate = () => {
    navigate("/create/", {
      state: {
        cookbook: selectedCookbook,
        section: selectedSection,
      },
    });
  };
  // useEffect(() => {
  //   setAllSections(allSections)
  //   setAllRecipes(allRecipes)

  // }, [])
  // useEffect(() => {
  //   console.log(
  //     "book: ", selectedCookbook,
  //     " section: ", selectedSection,
  //     " recipe: ", selectedRecipe
  //   );
  // }, [selectedSection, selectedCookbook, selectedRecipe]);

  // console.log(allRecipes);
  return (
    <Container>
      <Row>
        <Col xs={5}>
          <Row>
            <Col xs={6}>
              <Col className="justify-content-between">
                {selectedCookbook && selectedCookbook !== null ? (
                  <></>
                ) : (
                  <p>Start by creating your first cookbook using the dropdown.</p>
                )}
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    {selectedCookbook && selectedCookbook.fields.name}
                  </Dropdown.Toggle>
                  {allCookbooks && (
                    <Dropdown.Menu variant="dark" active>
                      {allCookbooks.map((cookbook) => (
                        <Dropdown.Item
                          onClick={() => handleCookbookChange(cookbook)}
                          href={`#/${cookbook.pk}`}
                          className="d-flex justify-content-between"
                        >
                          {cookbook.fields.name}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <AddButton
                          style={{ width: "90%" }}
                          cookbookId="new"
                          buttonType="cookbook"
                        />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </Col>
            </Col>
            <Col xs={6}>
              
                
                <Button variant='dark' size="sm" onClick={() => handleDelete('cookbook')}>Delete</Button>
              
              
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={5}>
          <Row>
            <Col className="mr-0" xs={6}>
              {" "}
              Sections
              {allSections && allSections.length > 0 ? (
                <ListGroup
                  bsClass="list"
                  variant="dark mt-2"
                  defaultActiveKey={allSections[0].pk}
                >
                  {allSections.map((section) => (
                    <ListGroup.Item
                      onClick={() => handleSectionChange(section)}
                      href={`#${section.pk}`}
                      className="d-flex justify-content-between"
                    >
                      {section.fields.name}
                      <Dropdown>
                        <Dropdown.Toggle
                          as={ThreeDotsVertical}
                          variant="success"
                          id="dropdown-basic"
                        >
                          Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleUpdate("section")}
                          >
                            Edit
                          </Dropdown.Item>
                          <EditModal
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            section={section.name}
                            category="section"
                            id={section.pk}
                            setShowModal={setShowModal}
                            showModal={showModal}
                          />
                          <Dropdown.Item
                            onClick={() => handleDelete("section")}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <></>
              )}
              {selectedCookbook && (
                <div className="d-grid">
                  <AddButton
                    cookbookId={selectedCookbook.pk}
                    buttonType="section"
                  />
                  {/* <Button variant="dark mt-2" size="sm">
                  Add Section
                </Button> */}
                </div>
              )}
            </Col>
            <Col className="mr-0" xs={6}>
              {" "}
              Recipes
              {allRecipes && allRecipes.length > 0 ? (
                <ListGroup
                  bsClass="list"
                  variant="dark mt-2"
                  defaultActiveKey={allRecipes[0].pk}
                >
                  {allRecipes.map((recipe) => (
                    <ListGroup.Item
                      action
                      onClick={() => handleRecipeChange(recipe)}
                      href={`#${recipe.pk}`}
                      className="d-flex justify-content-between"
                    >
                      {recipe.fields.name}
                      <Dropdown>
                        <Dropdown.Toggle
                          as={ThreeDotsVertical}
                          variant="success"
                          id="dropdown-basic"
                        >
                          Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleUpdate("recipe")}>
                            Edit
                          </Dropdown.Item>
                          <EditModal
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            recipe={recipe.name}
                            category="recipe"
                            id={recipe.pk}
                            setShowModal={setShowModal}
                            showModal={showModal}
                          />
                          <Dropdown.Item onClick={() => handleDelete("recipe")}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <></>
              )}
              <div className="d-grid">
                <Button variant="dark mb-2" size="sm" onClick={handleCreate}>
                  Add Recipe
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={7}>
          {selectedRecipe && (
            <>
              <h2>{selectedRecipe.fields.name}</h2>
              <Image
                src={selectedRecipe.fields.image_url}
                className="recipe-image"
                fluid
              />
              {/* <img style={{width: '75%', height: '75%'}} src={selectedRecipe.fields.image_url}></img> */}
              <h4>Ingredients:</h4>
              <p>{selectedRecipe.fields.ingredients}</p>
              <h4>Instructions:</h4>
              <p>{selectedRecipe.fields.instructions}</p>

              <p>Yield: {selectedRecipe.fields.quantity}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
