import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import retrieveRandomPaintingIdFromCollection from './components/retrieveRandomId';
import InfoPage from './InfoPage';
import Main from './Main';
import Navbar from './Navbar';

import styled from 'styled-components';
import axios from 'axios';
// import IndexDB from './utils/IndexDB';

const Styled = styled.div``;

// const LoadingText = styled.p``;

function App() {
  const [paintingData, setPaintingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [userInput, setUserInput] = useState('');

  const fetchCollection = () => {
    setLoading(true);
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`
      )
      .then((response) => {
        const collection = response.data.artObjects;
        console.log(collection);
        return collection;
      })
      .then((collection) => {
        return retrieveRandomPaintingIdFromCollection(collection);
      })
      .then((paintingID) => {
        setLoading(true);
        fetch(`https://www.rijksmuseum.nl/api/en/collection/${paintingID}?key=f1nLs8AG`, {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
          }
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
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

  // // CRON job for running API call every 24 hours
  // const cron = require('node-cron');
  // const task = cron.schedule(
  //   '0 6 * * *',
  //   () => {
  //     console.log('Running a job at 06:00 at Europe/Amsterdam timezone');
  //   },
  //   {
  //     scheduled: true,
  //     timezone: 'Europe/Amsterdam'
  //   }
  // );

  //place paintingData in localStorage
  const localStoragePaintingData = async () => {
    await localStorage.setItem('paintingLocalStorage', JSON.stringify({ paintingData }));
  };

  useEffect(() => {
    fetchCollection();
    localStoragePaintingData();
  }, []);

  return (
    <Styled className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              loading={loading}
              paintingData={paintingData}
              userinput={userInput}
              setUserInput={setUserInput}
              playerPoints={playerPoints}
              setPlayerPoints={setPlayerPoints}
              gamesPlayed={gamesPlayed}
              setGamesPlayed={setGamesPlayed}
            />
          }></Route>
        <Route
          path="/info"
          element={
            <InfoPage
              loading={loading}
              paintingData={paintingData}
              gamesPlayed={gamesPlayed}
              playerPoints={playerPoints}
            />
          }></Route>
      </Routes>
    </Styled>
  );
}

export default App;
