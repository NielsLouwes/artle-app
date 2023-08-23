/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Pixelify } from 'react-pixelify';

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

const Text = styled.p`
  margin-bottom: 15px;
`;
const LoadingText = styled.p``;

// const Error = styled.p`
//   color: red;
// `;

function Main({
  paintingData,
  loading,
  setUserInput,
  userInput,
  playerPoints,
  setPlayerPoints,
  gamesPlayed,
  setGamesPlayed
}) {
  if (loading) {
    return <LoadingText>Data is Loading...</LoadingText>;
  }

  // let navigate = useNavigate();

  const artistName = paintingData?.artist?.split(' ');
  // const lastName = artistName?.pop().toLowerCase();

  const inputTextHandler = (e) => {
    setUserInput(e.target.value);
  };

  // const playGame = (e) => {
  //   e.preventDefault();
  //   if (userInput.toLowerCase() === lastName) {
  //     setPlayerPoints(playerPoints + 1);
  //     setGamesPlayed(gamesPlayed + 1);
  //     localStorage.setItem('Score', playerPoints);
  //     localStorage.setGamesPlayed('Games', gamesPlayed);
  //     alert('You win!');
  //     navigate(`/info`);
  //     return;
  //   }
  //   setGamesPlayed(gamesPlayed + 1);
  //   localStorage.setItem('Score', playerPoints);
  //   localStorage.setGamesPlayed('Games', gamesPlayed);
  //   alert('Wrong answer!');
  //   navigate(`/info`);
  // };

  return (
    <Styled>
      <MainContainer>
        <Pixelify src={paintingData.image} pixelSize={6} width={650} height={650} centered={true} />
      </MainContainer>
      <Text>{paintingData.title}</Text>
      <Text>{paintingData.year}</Text>
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
        <Button  variant="contained" size="large">
          Submit answer
        </Button>
        <Link to="/info">See Info</Link>
        <Text>{gamesPlayed}</Text>
        <Text>{playerPoints}</Text>
      </Box>
    </Styled>
  );
}

export default Main;
