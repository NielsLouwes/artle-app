/* eslint-disable react/prop-types */
import React from 'react';
import { usePaintingData } from '../../utils/usePaintingData';
import { Image, MainContainer, PaintingInfo, Styled, Title, Name, Description } from './InfoPage.styled';

function InfoPage() {

  const { paintingData } = usePaintingData();

  return (
    <Styled>
      <MainContainer>
        <Image src={paintingData.image} alt="The painting of the day"></Image>
        <PaintingInfo>
          <Name>Artist name: {paintingData.artist}</Name>
          <Title>Title: {paintingData.title}</Title>
          <p>Dated: {paintingData.year}</p>
          <p>Medium: {paintingData.medium}</p>
          <p>{paintingData.classification}</p>
          {paintingData.description ? 
              <Description>  Description: {paintingData?.description}</Description> : ''
        }
        </PaintingInfo>
      </MainContainer>
    </Styled>
  );
}

export default InfoPage;
