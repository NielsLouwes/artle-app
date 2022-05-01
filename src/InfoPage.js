/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

const Styled = styled.div`
  height: 100vh;
`;

const MainContainer = styled.div``;

const Image = styled.img``;

const PaintingInfo = styled.div``;

const Name = styled.p``;

const Title = styled.p``;

const YearPainted = styled.p``;

const Description = styled.p``;

function InfoPage({ art, paintingData }) {
  console.log(paintingData);

  return (
    <Styled>
      <MainContainer>
        <Image src={art}></Image>
        <PaintingInfo>
          <Name>{paintingData.artist}</Name>
          <Title>{paintingData.title}</Title>
          <YearPainted>{paintingData.year}</YearPainted>
          <Description>{paintingData.classification}</Description>
        </PaintingInfo>
      </MainContainer>
    </Styled>
  );
}

export default InfoPage;
