/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

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

function Main({ art, paintingData, loading }) {
  if (loading) {
    return <p>Data is Loading...</p>;
  }
  // const lastName = paintingData.artist.split(' ');
  const artistName = paintingData?.artist?.split(' '); // full name
  console.log(paintingData);
  console.log(artistName);

  // const lastName = artistName?.split?(' ')
  // const finalName = lastName[1];
  // console.log('ARTIST NAME', artistName);
  // console.log('LAST NAME', lastName);
  // console.log('FINAL NAME', finalName);

  //randomize
  //in the URL after artworks/ there is the number for the artworks
  // randomize that with a function

  // 1. Get paintingData - artist name
  // 2. Split that for only last name
  // 3. Then event.input.value = last Name
  // 4. Game win/loss = navigate to infopage - needs to be useState
  // 5. on Infopage = check win/loss state and change heading based on that

  // need to split the name and only grab last name
  //compare that with input of the user

  const guessName = (event) => {
    if (event.input.value === lastName) {
      alert('You Win!');
    }
    alert('You lose!');
  };

  // console.log(guessName);

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
        <TextField id="outlined-basic" label="Guess last name" variant="outlined" />
        <Button OnChange={guessName} variant="contained">
          Submit answer
        </Button>
        <Link to="/info">See Info</Link>
      </Box>
    </Styled>
  );
}

export default Main;
