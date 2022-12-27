import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { NewRecipeContext } from "../pages/CreateRecipe";

const ImportButton = () => {
  const {
    newRecipe,
    setNewRecipe,
    imageUrl, setImageUrl,
    prepTime, setPrepTime,
    ingredients, setIngredients,
    steps, setSteps,
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
  const [show, setShow] = useState(false);
  const [inputURL, setInputURL] = useState("");
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setInputURL(e.target.value);
  // const options = {
  //   method: "POST",
  //   url: "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
  //   headers: {
  //     "content-type": "text/plain",
  //     "X-RapidAPI-Key": "1eba6af361msh98e2b8c4fb389fbp125da9jsnbc3af463ebb7",
  //     "X-RapidAPI-Host": "mycookbook-io1.p.rapidapi.com",
  //   },
  //   data: `${inputURL}`,
  // };
  const getRecipe = () => {
    setLoading(true);
    axios.post('/api/import-recipe', {url: inputURL})
      .then(function (response) {
        setNewRecipe(response.data[0])
        setImageUrl(response.data[0].images[0])
        setPrepTime(response.data[0]['total-time'])
        setIngredients(response.data[0].ingredients)
        setSteps(response.data[0].instructions[0].steps)
        setTitleInput(response.data[0].name)
        setDescInput(response.data[0].description)
        setSourceInput(response.data[0].url)
        setYieldInput(response.data[0].yield)
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false)
  }
  // const getRecipe = () => {
  //   setLoading(true)
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setNewRecipe(response.data[0])
  //       setTitleInput(response.data[0].name)
  //       setDescInput(response.data[0].description)
  //       setSourceInput(response.data[0].url)
  //       setYieldInput(response.data[0].yield)
  //       console.log(response.data[0]);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   setLoading(false)
  // };

  const handleSubmit = (e) => {
    
    e.preventDefault();

    getRecipe();
    handleClose();
  };

  return (
    <>
      <Button variant="dark mb-2" onClick={handleShow} size="sm">
        website
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Paste URL to import recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="url">URL:</label>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder="Enter URL"
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImportButton;
