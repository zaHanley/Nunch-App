import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './Browse'
import { Image } from 'react-bootstrap'
import axios from 'axios';

function Recipe({recipe}) {
  const  selectedRecipe  = useContext(UserContext)
  console.log(selectedRecipe)
  return (
    
    <div>
      
      
      {/* {selectedRecipe.map((item) => ( */}
      {selectedRecipe && 
        <>
          <p>{selectedRecipe.fields.name}</p>
          <Image src={selectedRecipe.fields.image_url} className='recipe-image' fluid />
          <ul>
            {" "}
            Ingredients:
            {selectedRecipe.fields.ingredients}
          </ul>
          <p>{selectedRecipe.fields.instructions}</p>
          
          <p>Yield: {selectedRecipe.fields.quantity}</p>
          <p></p>
        </>
      
      }
    </div>
  );
}

export default Recipe;
