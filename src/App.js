import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import retrieveRandomPaintingIdFromCollection from './components/retrieveRandomId';
import InfoPage from './InfoPage';
import Main from './Main';
import Navbar from './Navbar';

import styled from 'styled-components';
import axios from 'axios';

const Styled = styled.div``;

// const LoadingText = styled.p``;

function App() {
  const [paintingData, setPaintingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [userInput, setUserInput] = useState('');

  let navigate = useNavigate();

  const artistName = paintingData?.artist?.split(' ');
  const lastName = artistName?.pop().toLowerCase();

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

  useEffect(() => {
    fetchCollection();
  }, []);

  const playGame = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === lastName) {
      alert('You win!');
      navigate(`/info`);
      setPlayerPoints(playerPoints + 1);
      setGamesPlayed(gamesPlayed + 1);
      localStorage.setItem('Score', playerPoints);
      localStorage.setGamesPlayed('Games', gamesPlayed);
      return;
    }
    alert('Wrong answer!');
    navigate(`/info`);
    setGamesPlayed(gamesPlayed + 1);
    localStorage.setItem('Score', playerPoints);
    localStorage.setGamesPlayed('Games', gamesPlayed);
  };

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
              playGame={playGame}
              userinput={userInput}
              setUserInput={setUserInput}
            />
          }></Route>
        <Route
          path="/info"
          element={<InfoPage loading={loading} paintingData={paintingData} />}></Route>
      </Routes>
    </Styled>
  );
}

export default App;
