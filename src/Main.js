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

const Image = styled.img`
  width: 500px;
  height: 500px;
`;

// const Text = styled.p``;

function Main() {
  const [art, setArt] = useState('');
  // const [art, setArt] = useState('');
  //data.thumbnail.lqip

  // fetch('https://api.artic.edu/api/v1/artworks/129884')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.api_model));

  //randomize
  //in the URL after artworks/ there is the number for the artworks
  // randomize that with a function
  // need to grab the response image_id and past that back into the url at the end
  //https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/5cc6b6f1-5c4f-8fa1-7ac5-91b0c0403ae2

  const fetchData = async () => {
    try {
      const response = await axios(
        `https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/${imageId}`
      );
      const json = response.data.data;
      console.log(json);
      const imageId = json.image_id;
      console.log(imageId);
      // const data = response.data.data.thumbnail.lqip;
      setArt(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Button>Get art</Button>
      </Box>
    </Styled>
  );
}

export default Main;
