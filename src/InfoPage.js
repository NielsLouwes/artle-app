import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Styled = styled.div`
  height: 100vh;
`;

const MainContainer = styled.div``;

const Image = styled.img``;

const PaintingInfo = styled.div``;

const Name = styled.p``;

const YearPainted = styled.p``;

const Description = styled.p``;

function InfoPage() {
  const retrieveImage = async () => {
    try {
      const response = await axios(
        `https://api.artic.edu/api/v1/artworks/27991?fields=id,title,image_id/`
      );
      const json = await response.data.data;
      console.log(json);
      const imageId = await json.image_id;
      // setImage(imageId);
      console.log(imageId);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    retrieveImage();
  }, []);

  return (
    <Styled>
      <MainContainer>
        <Image></Image>
        <PaintingInfo>
          <Name></Name>
          <YearPainted></YearPainted>
          <Description></Description>
        </PaintingInfo>
      </MainContainer>
    </Styled>
  );
}

export default InfoPage;
