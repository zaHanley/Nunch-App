import React, { useState, useEffect, createContext, useContext } from "react";
import { CurrentUser } from "../App";
import CookbookNav from "../components/CookbookNav";
import  Container  from'react-bootstrap/Container'
import  Button  from 'react-bootstrap/Button'
import  Row from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import Recipe from "./Recipe";
import axios from "axios";

import TestNav from "../components/TestNav";

export const UserContext = createContext();

function TestBook() {
  const [allCookbooks, setAllCookbooks] = useState(null);
  const [allSections, setAllSections] = useState(null);
  const [allRecipes, setAllRecipes] = useState(null);
  const [selectedCookbook, setSelectedCookbook] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // pass current cookbook
  const getAllInfo = async () => {
    const cookbooks = await axios.get("/api/cookbooks/")
    setAllCookbooks(cookbooks.data)
    setSelectedCookbook(cookbooks.data[0])

    const cookbookId = await cookbooks.data[0].pk
    const sections = await axios.get(`/api/cookbooks/${cookbookId}/sections`)
    setAllSections(sections.data)
    setSelectedSection(sections.data[0])

    const sectionId = await sections.data[0].pk
    const recipes = await axios.get(`/api/sections/${sectionId}/recipes`)
    console.log(recipes.data)
    setAllRecipes(recipes.data)
    setSelectedRecipe(recipes.data[0])

  };

  useEffect(() => {
    getAllInfo()
  }, []);

  const getAllSections = async () => {
    const cookbookId = selectedCookbook.pk
    console.log(cookbookId)
    const sections = await axios.get(`/api/cookbooks/${cookbookId}/sections`)
    console.log('api response: ', sections)

    setAllSections(sections.data)
    setSelectedSection(sections.data[0])
    
    // if (sections.data[0])
    const sectionId = await sections.data[0].pk
    if (sectionId === undefined) {
      console.log('undefined section')
    }
    const recipes = await axios.get(`/api/sections/${sectionId}/recipes`)
    console.log(sectionId)
    setAllRecipes(recipes.data)
    setSelectedRecipe(recipes.data[0])
  }
  useEffect(() => {
    getAllSections()
  }, [selectedCookbook])

  useEffect(() => {
    const getAllRecipes = async () => {
      const sectionId = await selectedSection.pk
      console.log(sectionId)
      const recipes = await axios.get(`/api/sections/${sectionId}/recipes`)
      console.log(recipes.data)
      setAllRecipes(recipes.data)
      setSelectedRecipe(recipes.data[0])
    }

    getAllRecipes()

  }, [selectedSection])

  return (
    <UserContext.Provider
      value={{
        getAllInfo,
        allCookbooks,
        allSections,
        allRecipes,
        selectedCookbook,
        setSelectedCookbook,
        selectedSection,
        setSelectedSection,
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      <Container>
        <Row>
          <Col>
            <TestNav getAllSections={getAllSections} />
          </Col>
          {/* <Col xs={6}><Recipe recipe={selectedRecipe}/> 
          </Col> */}
        </Row>
      </Container>
    </UserContext.Provider>
  );
}

export default TestBook;
