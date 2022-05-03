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
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const randomNumber = getRandomInt(29000);

  //27980 original painting number

  const retrieveImage = () => {
    setLoading(true);
    fetch(`https://api.artic.edu/api/v1/artworks/${randomNumber}?fields=id,title,image_id/`)
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

  //solving returning only popular paintings
  // data has a has_not_been_viewed_much key which needs to be false
  // we need to filter on that and then randomize a result each 24 hours at the beginning of the day
  //classification_titles[0] === 'oil on canvas;
  // FILTER over data, return just popular and just oil on canvas
  //THEN GRAB JUST ONE AND RANDOMIZE SOMEHOW

  const imageInformation = () => {
    setLoading(true);
    fetch(`https://api.artic.edu/api/v1/artworks/${randomNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
