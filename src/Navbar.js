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
  display: flex;
  gap: 10px;
`;

function Navbar() {
  const [modal, setModal] = useState({ game: false, stats: false, settings: false });

  const toggleModal = (name) => {
    setModal({ ...modal, [name]: !modal[name] });
  };


  return (
    <Styled>
      <Title>ArTle</Title>
      <IconContainer>
        <HelpOutlineOutlinedIcon onClick={() => toggleModal('game')} />
        <StackedLineChartOutlinedIcon onClick={() => toggleModal('stats')} />
        <SettingsOutlinedIcon onClick={() => toggleModal('settings')} />
        <GameModal open2={modal.game} handleClose2={() => toggleModal('game')} />
        <StatisticModal open3={modal.stats} handleClose3={() => toggleModal('stats')} />
       <ModalComponent
          open={modal.settings}
          setOpen={setModal}
          handleClose={() => toggleModal('settings')}
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
