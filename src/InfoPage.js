/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';
import { usePaintingData } from './utils/usePaintingData';

const Styled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  height: 94vh;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  max-height: 650px;
  width: 650px;
  margin-bottom: 15px;
`;
const Image = styled.img`
  /* object-fit: cover; */
  width: 100%;
  height: auto;
`;

const PaintingInfo = styled.div``;

const Name = styled.p``;

const Title = styled.p``;

const YearPainted = styled.p``;

const Description = styled.p``;

function InfoPage() {

  const { paintingData } = usePaintingData();

  return (
    <Styled>
      <MainContainer>
        <Image src={paintingData.image} alt="The painting of the day"></Image>
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
