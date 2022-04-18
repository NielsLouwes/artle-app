import React, { useState } from 'react';
import styled from 'styled-components';
import MUIModal from './components/MUIModal';

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
`;

const IconContainer = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Styled>
      <IconContainer>
        <InfoOutlinedIcon />
        <HelpOutlineOutlinedIcon />
      </IconContainer>
      <Title>ArTle</Title>
      <IconContainer>
        <StackedLineChartOutlinedIcon />
        <SettingsOutlinedIcon onClick={handleOpen} />
      </IconContainer>
      <MUIModal open={open} handleOpen={handleOpen} />
    </Styled>
  );
}

export default Navbar;
