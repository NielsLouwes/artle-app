import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import styled from 'styled-components';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

const Styled = styled.div``;

function App() {
  const [art, setArt] = useState(null);
  const [paintingData, setPaintingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseArtUrl = `https://www.artic.edu/iiif/2/`;

  //add this randomize as the imageID , append to baseArtUrl
  // const randomizePaintingId = Math.round(Math.random() * 29000);

  const retrieveImage = () => {
    setLoading(true);
    fetch(`https://api.artic.edu/api/v1/artworks/27980?fields=id,title,image_id/`)
      .then((response) => response.json())
      .then((data) => {
        const paintingId = data.data.image_id;
        // console.log(paintingId); // we get the image ID

        const imageMain = `${baseArtUrl}${paintingId}/full/843,/0/default.jpg`;
        setArt(imageMain);
      })
      .catch((error) => {
        console.error('Request failed', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const imageInformation = () => {
    setLoading(true);
    fetch(`https://api.artic.edu/api/v1/artworks/27980`)
      .then((response) => response.json())
      .then((data) => {
        const artistTitle = data.data.artist_title;
        const paintingTitle = data.data.title;
        const classificationType = data.data.classification_titles[0];
        const paintingYear = data.data.fiscal_year;

        setPaintingData({
          artist: artistTitle,
          title: paintingTitle,
          classification: classificationType,
          year: paintingYear
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

  useEffect(() => {
    retrieveImage();
  }, []);

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Main art={art} paintingData={paintingData} loading={loading} />}></Route>
        <Route
          path="/info"
          element={<InfoPage art={art} paintingData={paintingData} loading={loading} />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
