/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  justify-content: center;
  height: 94vh;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  height: 500px;
  width: 500px;
  margin-bottom: 15px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// const Error = styled.p`
//   color: red;
// `;

function Main({ art, paintingData, loading }) {
  const [userInput, setUserInput] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  if (loading) {
    return <p>Data is Loading...</p>;
  }

  const artistName = paintingData?.artist?.split(' ');
  const lastName = artistName?.pop().toLowerCase();

  const inputTextHandler = (e) => {
    setUserInput(e.target.value);
  };

  const playGame = (e) => {
    e.preventDefault();
    // if (userInput.length < 3) {
    //   setErrorMessage('Too few characters');
    // }
    if (userInput.toLowerCase() === lastName) {
      alert('You win!');
      navigate(`/info`);
      return;
    }
    alert('Wrong answer!');
    navigate(`/info`);
  };

  // {
  //   errorMessage && <Error>{errorMessage}</Error>;
  // }

  //randomize
  //in the URL after artworks/ there is the number for the artworks
  // randomize that with a function

  return (
    <Styled>
      <MainContainer>
        <Image src={art}></Image>
      </MainContainer>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off">
        <TextField
          value={userInput}
          id="outlined-basic"
          label="Guess last name"
          variant="outlined"
          type="text"
          onChange={inputTextHandler}
        />
        <Button onClick={playGame} variant="contained" size="large">
          Submit answer
        </Button>
        <Link to="/info">See Info</Link>
      </Box>
    </Styled>
  );
}

export default Main;
