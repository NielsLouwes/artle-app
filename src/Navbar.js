import React, { useState } from 'react';
import styled from 'styled-components';

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Styled = styled.div`
  height: 6vh;
  border: 1px red solid;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.1;
  margin-left: 15px;
`;

const IconContainer = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

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

const Divider = styled.hr`
  border-top: 1px solid white;
  margin-top: 15px;
  margin-bottom: 15px;
`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  return (
    <Styled>
      <Title>ArTle</Title>
      <IconContainer>
        <HelpOutlineOutlinedIcon onClick={handleOpen2} />
        <StackedLineChartOutlinedIcon />
        <SettingsOutlinedIcon onClick={handleOpen} />
      </IconContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>Settings</Heading>
          <Container>
            <Text>Feedback</Text>
            <Link>insert link to email here</Link>
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
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Heading>How to play</Heading>
          <Text>Guess the last name of artist who painted each painting. </Text>
          <br></br>
          <Text>Get the name completely correct for a point.</Text>
          <Text>Receive half a point if you guess most of the word.</Text>
          <Divider></Divider>
          <Text>Come back everyday for a new painting!</Text>
        </Box>
      </Modal>
    </Styled>
  );
}

export default Navbar;
