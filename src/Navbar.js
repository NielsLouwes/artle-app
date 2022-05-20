import React, { useState } from 'react';
import styled from 'styled-components';

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import ModalComponent from './components/SocialsModal';
import StatisticModal from './components/StatisticModal';
import GameModal from './components/GameModal';

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

function Navbar() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  return (
    <Styled>
      <Title>ArTle</Title>

      <IconContainer>
        <HelpOutlineOutlinedIcon onClick={handleOpen2} />
        <StackedLineChartOutlinedIcon onClick={handleOpen3} />
        <SettingsOutlinedIcon onClick={handleOpen} />
        <GameModal open2={open2} handleClose2={handleClose2} />

        <StatisticModal open3={open3} handleClose3={handleClose3} />

        <ModalComponent
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          heading="Settings"
          feedback="Feedback"
          linkEmail="Insert link to email here"
          community="Community"
          linkTwitter="Insert here later"
          questions="Questions"
          faq="FAQ"
        />
      </IconContainer>
    </Styled>
  );
}

export default Navbar;
