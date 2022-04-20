import React, { useState } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  justify-content: center;
  height: 94vh;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  border: 2px solid black;
  height: 500px;
  width: 500px;
  margin-bottom: 15px;
`;

const Button = styled.button``;

const Text = styled.p``;

function Main() {
  const [joke, setJoke] = useState('');
  //   const response = axios.get(`https://api.artic.edu/api/v1/artworks/129884
  // `);

  const getArt = () => {
    axios.get('https://api.chucknorris.io/jokes/random').then((response) => {
      console.log(response);
      setJoke(response.data.setup + '... ' + response.data.punchline);
    });
  };

  return (
    <Styled>
      <MainContainer></MainContainer>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic" label="Guess last name" variant="outlined" />
        <Button onClick={getArt}>Get joke</Button>
        <Text>{joke}</Text>
      </Box>
    </Styled>
  );
}

export default Main;
