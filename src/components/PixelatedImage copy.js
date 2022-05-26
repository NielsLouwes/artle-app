import React, { useEffect, useRef } from 'react';

function PixelatedImage({ paintingData }) {
  //Pixelating image
  const myCanvas = useRef();

  useEffect(() => {
    const context = myCanvas.current.getContext('2d');
    const image = new Image();
    image.src = paintingData.image;

    var pixelate = new Pixelate(image, { amount: 0.7 });

    image.onload = () => {
      context.drawImage(image, 0, 0, 650, 500);
    };
  }, []);
  return <canvas ref={myCanvas} width={650} height={500} />;
}

export default PixelatedImage;
