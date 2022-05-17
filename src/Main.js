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
  max-height: 650px;
  width: 650px;
  margin-bottom: 15px;
`;
const Image = styled.img`
  /* object-fit: cover; */
  width: 100%;
  height: auto;
`;

const LoadingText = styled.p``;

// const Error = styled.p`
//   color: red;
// `;

function Main({ paintingData, loading }) {
  const [userInput, setUserInput] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  if (loading) {
    return <LoadingText>Data is Loading...</LoadingText>;
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

  return (
    <Styled>
      <MainContainer>
        <Image src={paintingData.image} alt="The painting of the day"></Image>
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
          inputProps={{
            maxLength: 25
          }}
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
