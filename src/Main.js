/* eslint-disable react/prop-types */
import React from 'react';

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
        <TextField id="outlined-basic" label="Guess last name" variant="outlined" />
      </Box>
    </Styled>
  );
}

export default Main;
