import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

import styled from 'styled-components';

const Styled = styled.div``;

// const LoadingText = styled.p``;

// const axios = require('axios').default;

function App() {
  const [art, setArt] = useState([]);
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

  const getArtData = () => {
    setLoading(true);
    fetch(`https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=f1nLs8AG`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        const paintingYear = data.artObject?.dating.sortingDate;
        const artistName = data.artObject?.principalMakers[0].name;
        const paintingTitle = data.artObject?.title;
        const paintingImageLink = data.artObject?.webImage.url;
        const paintingDescription = data.artObject?.label.description;
        const physicalMedium = data.artObject?.physicalMedium;
        console.log(data);
        setArt(paintingImageLink);
        setPaintingData({
          artist: artistName,
          title: paintingTitle,
          medium: physicalMedium,
          year: paintingYear,
          description: paintingDescription,
          image: paintingImageLink
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        console.error('Request failed', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArtData();
  }, []);

  console.log(art);

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main art={art} loading={loading} />}></Route>
        <Route
          path="/info"
          element={<InfoPage art={art} loading={loading} paintingData={paintingData} />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
