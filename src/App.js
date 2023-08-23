import React from "react";
import { Routes, Route } from "react-router-dom";
import InfoPage from "./pages/InfoPage/InfoPage";
import Main from "./pages/Main/Main";
import Navbar from "./Navbar";


function App() {
  //place paintingData in localStorage
  // const localStoragePaintingData = async () => {
  //   await localStorage.setItem('paintingLocalStorage', JSON.stringify({ paintingData }));
  // };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/info" element={<InfoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
