import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import styled from 'styled-components';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

const Styled = styled.div``;

function App() {
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
