import React from 'react';
import {useState} from 'react'
import { Navbar, ListGroup, Button } from 'react-bootstrap';

function SideMenu() {
  // State to track the list of categories and recipes
  const [categories, setCategories] = useState([
    {
      name: 'Breakfast',
      recipes: [
        { name: 'Omelette' },
        { name: 'Pancakes' },
        { name: 'Cereal' }
      ]
    },
    {
      name: 'Lunch',
      recipes: [
        { name: 'Sandwich' },
        { name: 'Salad' },
        { name: 'Soup' }
      ]
    }
  ]);

  // Function to add a new category
  const addCategory = () => {
    setCategories([...categories, { name: 'New category', recipes: [] }]);
  };

  // Function to add a new recipe to a given category
  const addRecipe = category => {
    const updatedCategories = categories.map(cat => {
      if (cat.name === category.name) {
        return {
          ...cat,
          recipes: [...cat.recipes, { name: 'New recipe' }]
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  return (
    <div class="container">
  <div class="row">
    <div class="col-md-3">
      
      <div class="sidebar">
        <h3>Sidebar</h3>
        <div class="row">
          <div class="col-md-12 col-lg-6">
            
            <h4>First Column</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="col-md-12 col-lg-6">
            
            <h4>Second Column</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      
      <div class="main-content">
        <h3>Main Content</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</div>

    // <Navbar>
    //   {categories.map(category => (
    //     <ListGroup>
    //       <ListGroup.Item>
    //         {category.name}
    //         <Button onClick={() => addRecipe(category)}>Add recipe</Button>
    //       </ListGroup.Item>
    //       {category.recipes.map(recipe => (
    //         <ListGroup.Item>{recipe.name}</ListGroup.Item>
    //       ))}
    //     </ListGroup>
    //   ))}
    //   <Button onClick={addCategory}>Add category</Button>
    // </Navbar>
  );
}

export default SideMenu