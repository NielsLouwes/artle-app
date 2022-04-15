import React from "react";
import styled from "styled-components";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  return (
    <Styled>
      <IconContainer>
        <InfoOutlinedIcon />
        <HelpOutlineOutlinedIcon />
      </IconContainer>
      <Title>Artle</Title>
      <IconContainer>
        <SettingsOutlinedIcon />
        <StackedLineChartOutlinedIcon />
      </IconContainer>
    </Styled>
  );
}

export default Navbar;
