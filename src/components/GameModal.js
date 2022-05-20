import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Styled = styled.div`
  height: 6vh;
  border: 1px red solid;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;

const Text = styled.p``;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'black',
  border: '2px solid black',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

const Divider = styled.hr`
  border-top: 1px solid white;
  margin-top: 15px;
  margin-bottom: 15px;
`;

function GameModal({ open2, handleClose2 }) {
  return (
    <Styled>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>How to play</Heading>
          <Text>Guess the last name of the artist who painted each painting. </Text>
          <br></br>
          <Text>Get the name completely correct for a point.</Text>
          <Text>Receive half a point if you guess most of the word.</Text>
          <br></br>
          <Text>Winners each month are given a discount code for a museum near them!</Text>
          <Divider></Divider>
          <Text>Come back everyday for a new painting!</Text>
        </Box>
      </Modal>
    </Styled>
  );
}

export default GameModal;
