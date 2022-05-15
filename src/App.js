import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

import styled from 'styled-components';
import axios from 'axios';
import retrieveRandomPaintingIdFromCollection from './components/retrieveRandomId';

const Styled = styled.div``;

// const LoadingText = styled.p``;

function App() {
  const [paintingData, setPaintingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCollection = () => {
    setLoading(true);
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`
      )
      .then((response) => {
        const collection = response.data.artObjects;
        return collection;
      })
      .then((collection) => {
        return retrieveRandomPaintingIdFromCollection(collection);
      })
      .then(async (paintingID) => {
        setLoading(true);
        await fetch(`https://www.rijksmuseum.nl/api/en/collection/${paintingID}?key=f1nLs8AG`, {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
          }
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            const paintingYear = data.artObject?.dating.sortingDate;
            const artistName = data.artObject?.principalMakers[0].name;
            const paintingTitle = data.artObject?.title;
            const paintingImageLink = data.artObject?.webImage.url;
            const paintingDescription = data.artObject?.label.description;
            const physicalMedium = data.artObject?.physicalMedium;

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
    fetchCollection();
  }, []);

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main loading={loading} paintingData={paintingData} />}></Route>
        <Route
          path="/info"
          element={<InfoPage loading={loading} paintingData={paintingData} />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
