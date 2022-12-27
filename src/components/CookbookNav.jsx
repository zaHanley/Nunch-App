import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { UserContext } from "../pages/Browse";

function CookbookNav() {
  const [ 
    userData, setUserData,
    selectedCookbook, setSelectedCookbook,
    selectedSection, setSelectedSection,
    selectedRecipe, setSelectedRecipe
    ] = useContext(UserContext);

  useEffect(() => {
    console.log(userData)
  }, [])
  return (
    <div>
      {userData &&
      <Container>
        <Row>{userData.map(cookbook => cookbook.cookbook)}</Row>
      <Row>
        <Col xs={5}>
          
            <ul class="nav nav-pills flex-column">
              <li class="nav-item dropdown">Sections
                <a
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >                  
                </a>{" "}
                {/* ADD A DROPDOWN TO SELECT SPECIFIC COOKBOOK */}
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          ADD SECTION BUTTON
        </Col>
        <Col xs={7}>Recipes
          <div class="list-group">
            {userData.map((item) =>
              item.recipe.map((recipe) => (
                <a href="#" class="list-group-item list-group-item-action">
                  {recipe.name}
                </a>
              ))
            )}
          </div>
          ADD RECIPE BUTTON
        </Col>
      </Row> 
        </Container>}
      
    </div>
  );
}

export default CookbookNav;
