import React, { useEffect, useState, useContext } from "react";
import { NewRecipeContext } from "./CreateRecipe";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function NewRecipe() {
  const {
    imageUrl, setImageUrl,
    prepTime, setPrepTime,
    ingredients, setIngredients,
    steps, setSteps,
    newRecipe,
    setNewRecipe,
    titleInput,
    setTitleInput,
    descInput,
    setDescInput,
    sourceInput,
    setSourceInput,
    yieldInput,
    setYieldInput,
    loading, setLoading,
   } = useContext(NewRecipeContext);

  useEffect(() => {
    setNewRecipe([])
  }, [])
  

  return (
    <div>
            <h1>{titleInput}</h1>
            {imageUrl && 
              <img
              src={imageUrl}
              style={{ height: "250px", width: "300px" }}
            />
            }
            
            <p>{descInput}</p>
            
            <Row>
              <Col xs={4}>
                {prepTime && <h6>Total time: {prepTime}</h6>}
              {ingredients && 

              
            (typeof ingredients === 'string' ? ( 
              <p>{ingredients}</p>
              
              
            ) : (
              <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
              </ul>
            ))
              }
              </Col>
              <Col xs={8}>
                
              {steps && 
            (typeof steps === 'string' ? (
              <p>{steps}</p>
            ) : (
              <ul>
              {steps.map((step) => (
                <li>{step}</li>
              ))}
              </ul>
            ))
              }
              </Col>
            </Row>
            

            
            
            {sourceInput && 
            <h6>Source: {sourceInput}</h6>
            }
            {yieldInput &&
            <h6>Yield: {yieldInput} servings</h6>
            }
            
            
    
      
    </div>
  );
}

export default NewRecipe;
