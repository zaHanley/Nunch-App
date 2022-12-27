import React, { useState, useEffect, createContext } from "react";
import CookbookNav from "../components/CookbookNav";
import { Container, Button, Row, Col } from "react-bootstrap";
import Recipe from "./Recipe";
import axios from "axios";

export const UserContext = createContext();

function Browse() {
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    //   axios.get('/api/browse/', {
    //     params: {
    //       user_id: 1
    //     }
    //   }).then(response => {
    //     console.log(response.data)
    //     // const data = JSON.parse(response.data)
    //     // console.log(data)
    //     setUserData(response.data)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    //   const response = await axios.get('/api/browse/');
    //   console.log(await response.json())
    // .then(function (response) {
    //   console.log(response);
    //   setUserData(response.data);
    //   localStorage.setItem("recipe", JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });
    // }
  };

  // const getCookbooksForUser = async () => {
  //     const response = await axios.get('/api/browse/', {
  //         params: {
  //             user_id: 1
  //         }
  //       });
  //     const data = await response.data
  //     console.log(data)
  //     setUserData(data)

  //     }
  
  const getCookbooksForUser = async () => {
    const response = await axios.get("/api/browse/", {
      params: {
        user_id: 1,
      },
    });
    const data = await response.data;
    setUserData(data);
  };

  useEffect(() => {
    getCookbooksForUser();
  }, []);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <Container>
        <Row>
          <Col>
            <CookbookNav />
          </Col>
          <Col xs={9}>
            <Recipe />
          </Col>
        </Row>
      </Container>
    </UserContext.Provider>
  );
}

export default Browse;
