import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Styled = styled.div``;

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

function ModalComponent({
  open,
  handleClose,
  heading,
  feedback,
  linkEmail,
  community,
  linkTwitter,
  questions,
  faq
}) {
  return (
    <Styled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>{heading}</Heading>
          <Container>
            <Text>{feedback}</Text>
            <Link>{linkEmail}</Link>
          </Container>
          <Container>
            <Text>{community}</Text>
            <Link>{linkTwitter}</Link>
          </Container>
          <Container>
            <Text>{questions}</Text>
            <Link>{faq}</Link>
          </Container>
        </Box>
      </Modal>
    </Styled>
  );
}

export default ModalComponent;
