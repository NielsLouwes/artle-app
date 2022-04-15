import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import styled from "styled-components";
import InfoPage from "./InfoPage";

const Styled = styled.div``;

const Navbar = styled.div`
  height: 6vh;
  border: 1px red solid;
  background: black;
  color: white;
  text-align: center;
`;

function App() {
  return (
    <Styled className="App">
      <Navbar> ARTLE</Navbar>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/info" element={<InfoPage />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
