import React, { useEffect } from 'react';
import axios from 'axios';

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

  return <h2>Great job! Did you know...</h2>;
}

export default InfoPage;
