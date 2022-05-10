/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

const Styled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  height: 94vh;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 650px;
  height: 650px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PaintingInfo = styled.div``;

const Name = styled.p``;

const Title = styled.p``;

const YearPainted = styled.p``;

const Description = styled.p``;

function InfoPage({ art, paintingData }) {
  return (
    <Styled>
      <MainContainer>
        <Image src={art}></Image>
        <PaintingInfo>
          <Name>{paintingData.artist}</Name>
          <Title>{paintingData.title}</Title>
          <YearPainted>{paintingData.year}</YearPainted>
          <Description>{paintingData.medium}</Description>
          <Description>{paintingData.classification}</Description>
          <Description>{paintingData.description}</Description>
        </PaintingInfo>
      </MainContainer>
    </Styled>
  );
}

export default InfoPage;
