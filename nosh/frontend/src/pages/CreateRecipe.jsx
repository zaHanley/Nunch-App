import React, { useState, createContext } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import NewRecipe from './NewRecipe'
import Create from '../components/Create'


export const NewRecipeContext = createContext()

function CreateRecipe() {
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [newRecipe, setNewRecipe] = useState(null)
    const [titleInput, setTitleInput] = useState('')
    const [descInput, setDescInput] = useState('')
    const [sourceInput, setSourceInput] = useState('')
    const [yieldInput, setYieldInput] = useState('')
    const [loading, setLoading] = useState(false)
  return (
    <div>
      <NewRecipeContext.Provider value={{
      newRecipe, setNewRecipe, 
      titleInput, setTitleInput,
      ingredients, setIngredients,
      prepTime, setPrepTime,
      steps, setSteps,
      imageUrl, setImageUrl,
      descInput, setDescInput,
      sourceInput, setSourceInput,
      yieldInput, setYieldInput,
      loading, setLoading,
      }} >
        
    <Container>
      <Row>
        <Col>
          <Create />
        </Col>
        <Col xs={9}>
          <NewRecipe />
        </Col>
      </Row>
    </Container> 
    </NewRecipeContext.Provider>
    </div>
    
  )
}

export default CreateRecipe