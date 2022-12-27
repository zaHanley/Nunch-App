import React from "react";
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import Calendar from "../components/Calendar";
import Container from'react-bootstrap/Container'
import  Button  from 'react-bootstrap/Button'
import  Row from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'


function Home({user}) {
  return (
    
    

    <Container>
      <Row>
        
        <h1 style={{padding: '10px', textAlign: 'center'}}>Nunch</h1>
        <p>Nunch was created when our family started saving annual cookbooks to remember and recreate our favorite meals. Not only did we pull lots of recipes from online, but we made a lot of our own changes and wanted to keep them. As our family has grown and we’ve spent many years making cookbooks, I wanted to make it easier. With this app, you can make multiple cookbooks in case you like themes (like us), and break them up into sections to make it easier to find what you're looking for.</p>
        <br></br>
        <Col className='text-center mt-4'>
          <Popular />
        </Col>
      </Row>
    </Container> 
  );
}

export default Home;
