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
  const [collection, setCollection] = useState([]);
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

  //To get Rijks paint data
  // 1. Do API call for collection
  // 2. put collection in collection state
  // 3. spread that collection state and filter it to exclude "anonomous painters"
  // 4. Grab a random objectNumber and use that in another API call to directly for that painting

  const getCollectionData = () => {
    setLoading(true);
    fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.artObjects);
        console.log(data.artObjects[0].objectNumber); // finding specific paintingID
        setCollection(data.artObjects);
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

  //take the collection of top 100 results and filter to exclude anonymous
  console.log(collection);
  const filteredCollection = collection.filter(
    (element) => element.principalOrFirstMaker !== 'anonymous'
  );
  console.log(filteredCollection);

  //  const getArtData = () => {
  //   setLoading(true);
  //   fetch(
  //     `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`,
  //     {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Accept: 'application/json'
  //       }
  //     }
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //       const paintingYear = data.artObject?.dating.sortingDate;
  //       const artistName = data.artObject?.principalMakers[0].name;
  //       const paintingTitle = data.artObject?.title;
  //       const paintingImageLink = data.artObject?.webImage.url;
  //       const paintingDescription = data.artObject?.label.description;
  //       const physicalMedium = data.artObject?.physicalMedium;

  //       setArt(paintingImageLink);
  //       setPaintingData({
  //         artist: artistName,
  //         title: paintingTitle,
  //         medium: physicalMedium,
  //         year: paintingYear,
  //         description: paintingDescription,
  //         image: paintingImageLink
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response.data);
  //       }
  //       console.error('Request failed', error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    getCollectionData();
  }, []);

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
