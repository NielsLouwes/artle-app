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
  // const [image, setImage] = useState('');

  // fetch('https://api.artic.edu/api/v1/artworks/129884')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.api_model));

  //randomize
  //in the URL after artworks/ there is the number for the artworks
  // randomize that with a function
  // need to grab the response image_id and past that back into the url at the end
  //https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/5cc6b6f1-5c4f-8fa1-7ac5-91b0c0403ae2

  const baseArtUrl = `https://www.artic.edu/iiif/2/`;

  //add this randomize as the imageID , append to baseArtUrl
  const randomizePaintingId = Math.round(Math.random() * 29000);

  const retrieveImage = async () => {
    try {
      const response = await axios(
        `https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/`
      );
      const imageID = await response.data.data.image_id;
      console.log(imageID, 'IMAGE ID');
      const artImage = axios(`${baseArtUrl}${imageID}`);
      setArt(artImage);
    } catch (error) {
      console.log(error.response);
    }
  };
  // .then(data => {
  // // const rocketId = data.rocket;
  // return fetch(`${url}/rockets/${rocketId}`); // make a 2nd request and return a promise
  // })
  // .then(response => response.json())
  // .catch(err => {
  //   console.error('Request failed', err)
  // })

  // 2nd attempt at chaining api fetching
  const result = fetch(`https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/`)
    .then((response) => response.json())
    .then((data) => {
      const paintingId = data.data.data.image_id;

      return fetch(`${baseArtUrl}${paintingId}`);
    })
    .catch((error) => {
      console.error('Request failed', error);
    });
  //check that result is giving us what we want
  console.log(result); // what is this returning?

  //imageID isn't showing here

  const showPainting = async (imageId) => {
    try {
      const image = await axios(`${baseArtUrl}${imageId}`);
      setArt(image);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    retrieveImage();
  }, []);

  useEffect(() => {
    showPainting();
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
