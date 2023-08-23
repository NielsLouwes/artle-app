import React from "react";
import { Routes, Route } from "react-router-dom";
// import retrieveRandomPaintingIdFromCollection from './utils/retrieveRandomId';
import InfoPage from "./InfoPage";
import Main from "./Main";
import Navbar from "./Navbar";
import styled from "styled-components";
// import axios from 'axios';
// import { useFetch } from './utils/useFetch';

const Styled = styled.div``;

// const LoadingText = styled.p``;

function App() {
  //place paintingData in localStorage
  // const localStoragePaintingData = async () => {
  //   await localStorage.setItem('paintingLocalStorage', JSON.stringify({ paintingData }));
  // };

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/info" element={<InfoPage />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
