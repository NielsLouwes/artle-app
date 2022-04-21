import React, { useEffect, useState } from 'react';

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

// const Text = styled.p``;

function Main() {
  // const [art, setArt] = useState('');
  //data.thumbnail.lqip

  // fetch('https://api.artic.edu/api/v1/artworks/129884')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.api_model));

  const fetchData = async () => {
    const [art, setArt] = useState('');

    try {
      const response = await axios('https://api.artic.edu/api/v1/artworks/129884');
      const data = response.data;
      setArt(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Button>Get art</Button>
      </Box>
    </Styled>
  );
}

export default Main;
