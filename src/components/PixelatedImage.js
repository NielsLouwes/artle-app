import React, { useEffect, useRef } from 'react';

function PixelatedImage({ paintingData }) {
  //Pixelating image
  const myCanvas = useRef();

  useEffect(() => {
    const context = myCanvas.current.getContext('2d');
    const image = new Image();
    image.src = paintingData.image;

    image.onload = () => {
      context.drawImage(image, 0, 0, 500, 500);
    };
  }, []);
  return <canvas ref={myCanvas} width={500} height={500} />;
}

export default PixelatedImage;
