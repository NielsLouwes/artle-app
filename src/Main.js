/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// import axios from 'axios';
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
  height: 500px;
  width: 500px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
`;

function Main({ art }) {
  // const [image, setImage] = useState('');
  // const [data, setData] = useState(null);
  // const [paintingData, setPaintingData] = useState([]);

  //randomize
  //in the URL after artworks/ there is the number for the artworks
  // randomize that with a function

  // Put the information I need into a piece of state as an object to share to the next page when win/loss
  // const paintingData = [
  //   {
  //     artist: data.artist_title,
  //     title: data.title,
  //     classification: data.classification_title,
  //   }
  // ]

  // need to split the name and only grab last name
  //compare that with input of the user

  // const guessName = (input) => {
  //   if (input === data)
  // }
  // eslint-disable-next-line no-unused-vars
  // const imageInformation = () => {
  //   fetch(`https://api.artic.edu/api/v1/artworks/27980`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const artistTitle = data.data.artist_title;
  //       const paintingTitle = data.data.title;
  //       const classificationType = data.data.classification_titles[0];

  //       console.log(paintingTitle);
  //       console.log(classificationType);
  //       console.log(artistTitle);

  //       setPaintingData({
  //         artist: artistTitle,
  //         title: paintingTitle,
  //         classification: classificationType
  //       });
  //       console.log(paintingData);
  //     });
  // };

  // useEffect(() => {
  //   imageInformation();
  // }, []);

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
        <Link to="/info">See Info</Link>
      </Box>
    </Styled>
  );
}

export default Main;
