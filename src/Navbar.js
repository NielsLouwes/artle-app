import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 6vh;
  border: 1px red solid;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.1;
`;

function Navbar() {
  return (
    <Styled>
      <Title>Artle</Title>
    </Styled>
  );
}

export default Navbar;
