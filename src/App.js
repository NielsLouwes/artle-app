import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import styled from 'styled-components';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

const Styled = styled.div``;

function App() {
  // const [art, setArt] = useState(null);
  const [paintingData, setPaintingData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const baseArtUrl = `https://www.artic.edu/iiif/2/`;
  // const rijksArtApi = 'f1nLs8AG';
  // const exampleRijksCall = 'https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=f1nLs8AG';

  //add this randomize as the imageID , append to baseArtUrl
  // const randomizePaintingId = Math.round(Math.random() * 29000);
  // const getRandomInt = (max) => {
  //   return Math.floor(Math.random() * max);
  // };

  // const randomNumber = getRandomInt(29000);

  //27980 original painting number

  // const retrieveImage = () => {
  //   setLoading(true);
  //   fetch(`https://api.artic.edu/api/v1/artworks/27980?fields=id,title,image_id/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const paintingId = data.data.image_id;
  //       // console.log(paintingId); // we get the image ID

  //       const imageMain = `${baseArtUrl}${paintingId}/full/843,/0/default.jpg`;
  //       setArt(imageMain);
  //     })
  //     .catch((error) => {
  //       console.error('Request failed', error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const imageInformation = () => {
    setLoading(true);
    fetch(`https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=f1nLs8AG`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const paintingYear = data.artObject.dating.sortingDate;
        const artistName = data.artObject.principalMakers[0].name;
        const paintingTitle = data.artObject.title;
        const paintingImageLink = data.artObject.webImage.url;
        const paintingDescription = data.artObject.label.description;
        const physicalMedium = data.artObject.physicalMedium;

        console.log(paintingYear); // return 1642
        console.log(artistName); // return artistName correct
        console.log(paintingTitle);
        console.log(paintingImageLink);
        console.log(paintingDescription);
        console.log(physicalMedium);

        // setArt(paintingImageLink);

        setPaintingData({
          // artist: artistTitle,
          // title: paintingTitle,
          // classification: classificationType,
          // year: paintingYear
        })
          .catch((error) => {
            console.error('Request failed', error);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  useEffect(() => {
    imageInformation();
  }, []);

  // useEffect(() => {
  //   retrieveImage();
  // }, []);

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main paintingData={paintingData} loading={loading} />}></Route>
        <Route
          path="/info"
          element={<InfoPage paintingData={paintingData} loading={loading} />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
