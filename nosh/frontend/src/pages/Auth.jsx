import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import Calendar from "../components/Calendar";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Auth({loginStatus, setLoginStatus}) {
  // const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (value) => {
    if (value === activeTab) {
      return;
    }
    setActiveTab(value);
  };

  const handleSignUp = async (eventClick) => {
    let first_name = document.getElementById("form3").value;
    let last_name = document.getElementById("form4").value;
    let email = document.getElementById("form5").value;
    let password = document.getElementById("form6").value;
    let response = await axios.post("/sign_up/", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });
    setLoginStatus(true);
    // window.location.href='/';
    console.log(response.data);
  };

  const handleSignIn = async (eventClick) => {
    let email = document.getElementById("form1").value;
    let password = document.getElementById("form2").value;
    let response = await axios.post("/sign_in/", {
      email: email,
      password: password,
    });
    console.log(response.data);
    setLoginStatus(true)
    
    window.location.href='/';
  };

  useEffect(() => {
    if (loginStatus) {
        navigate('/cookbooks')
    }
  }, [loginStatus])

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick("tab1")}
              active={activeTab === "tab1"}
            >
              Sign In
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick("tab2")}
              active={activeTab === "tab2"}
            >
              Sign Up
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={activeTab === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn onClick={handleSignIn} className="mb-4 w-100">
              Sign in
            </MDBBtn>

            <p className="text-center">
              Not a member?{" "}
              <a
                href="#!"
                onClick={() => handleTabClick("tab2")}
                active={activeTab === "tab2"}
              >
                Sign up
              </a>
            </p>
          </MDBTabsPane>
          <MDBTabsPane show={activeTab === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="First Name"
              id="form3"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Last Name"
              id="form4"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form5"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form6"
              type="password"
            />
            {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div> */}
            <MDBBtn onClick={() => handleSignUp()} className="mb-4 w-100">
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>

      {loginStatus ? <Navigate to="/cookbooks" /> : ""}
    </>
  );
}

export default Auth;
