import React from 'react';

import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

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

function muiModal() {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>Settings</Heading>
          <Container>
            <Text>Feedback</Text>
          </Container>
          <Container>
            <Text>Community</Text>
            <Link>Twitter</Link>
          </Container>
          <Container>
            <Text>Questions</Text>
            <Link>FAQ</Link>
          </Container>
        </Box>
      </Modal>
    </>
  );
}

export default Modal;
