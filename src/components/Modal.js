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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 35px;
`;

const Text = styled.p``;

const Link = styled.p``;

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

function ModalComponent({ open, handleClose }) {
  return (
    <Styled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>Statistics</Heading>
          <Container>
            <Text>Games Played</Text>
            <Link>Insert state from function here that tracks</Link>
          </Container>
          <Container>
            <Text>Win Percentage</Text>
            <Link>insert win percentage from function here</Link>
          </Container>
          <Container>
            <Text>Streak</Text>
            <Link>Insert streak figure here from function/state</Link>
          </Container>
        </Box>
      </Modal>
    </Styled>
  );
}

export default ModalComponent;
