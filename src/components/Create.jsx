import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ImportButton from "./ImportButton";
import InputModal from './InputModal'
import DataModal from "./DataModal";
import AddButton from './AddButton';
import { NewRecipeContext } from "../pages/CreateRecipe";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Create() {
  const navigate = useNavigate()
  const location = useLocation()
  const cookbookId = location.state.cookbook.pk
  const sectionId = location.state.section.pk
  const {
    newRecipe,
    setNewRecipe,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    imageUrl, 
    setImageUrl,
    titleInput,
    setTitleInput,
    descInput,
    setDescInput,
    sourceInput,
    setSourceInput,
    yieldInput,
    setYieldInput,
    prepTime, 
    setPrepTime,
    loading,
    setLoading,
   } = useContext(NewRecipeContext);

  const handleSubmit = () => {
    axios.post('/api/recipe', {
      name: titleInput, 
      instructions: steps,
      ingredients: ingredients,
      description: descInput, 
      imageUrl: imageUrl,
      source: sourceInput, 
      quantity: yieldInput,
      time: prepTime,
      
      cookbookId: cookbookId,
      sectionId: sectionId,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))

    navigate('/cookbooks')
  }

  return (
    <div>
      <h5 class="mt-3">Import a recipe from:</h5>
      <div className="d-grid">
      <ImportButton />
      </div>
      

      <h5>Or create one below</h5>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>title</Form.Label>
          <Form.Control onChange={(e) => setTitleInput(e.target.value)} type="text" placeholder="" defaultValue={titleInput}/>
        </Form.Group>
        <div className="d-grid">
          <InputModal category={'ingredients'} state={ingredients} setState={setIngredients}/>
        
        <br />
        <InputModal category={'steps'} state={steps} setState={setSteps}/>
        
        <br />
        <DataModal category='image' state={imageUrl} setState={setImageUrl} />
        <br />
        <DataModal category='cooking time' state={prepTime} setState={setPrepTime} />
        </div>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control onChange={(e) => setDescInput(e.target.value)} type="text" placeholder="" defaultValue={descInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="source">
          <Form.Label>source</Form.Label>
          <Form.Control onChange={(e) => setSourceInput(e.target.value)} type="text" placeholder="" defaultValue={sourceInput}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="yield">
          <Form.Label>yield</Form.Label>
          <Form.Control onChange={(e) => setYieldInput(e.target.value)} type="text" placeholder="" defaultValue={yieldInput}/>
        </Form.Group>
        <div className="d-grid">
        <Button variant="dark" onClick={() => handleSubmit()} size="sm">
          Save Recipe
        </Button>
        </div>
        
      </Form>
    </div>
  );
}

export default Create;
