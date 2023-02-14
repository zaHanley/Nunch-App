import { useEffect, useState, createContext } from "react";
import dotenv from "dotenv";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios, { all } from "axios";
import Pages from "./pages/Pages";
import Home from "./pages/Home";
import Popular from "./components/Popular";
import Browse from "./pages/Browse";
import Recipe from "./pages/Recipe";
import Create from "./components/Create";
import CreateRecipe from "./pages/CreateRecipe";
import TestBook from "./pages/TestBook";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const CurrentUser = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false)

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

  async function currentUser() {
    const response = await axios.get("/curr_user");
    const user = await response.data;
    if (user && user.success) {
      setUser(user)
      setLoginStatus(user.success)
    }
  }

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div>
      <Router>
      <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>

        {loginStatus ? (
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}></Route>
            <Route path="/cookbooks" element={<TestBook user={user} />}></Route>
            <Route path="/browse" element={<Popular />}></Route>
            <Route path="/create" element={<CreateRecipe/>}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}></Route>
            <Route path="/signin" element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}></Route>
            <Route
              path="/cookbooks"
              element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}
            ></Route>
            <Route path="/browse" element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}></Route>
            <Route path="/dev" element={<Auth loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}
export default App;
