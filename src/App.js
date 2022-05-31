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

  useEffect(() => {
    fetchCollection();
  }, []);

  const IndexDB = async () => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    if (!indexedDB) {
      console.log('IndexedDB could not be found in this browser.');
    }

    const request = indexedDB.open('PaintingDatabase', 1);

    request.onerror = (event) => {
      console.error('Database error: ' + event.target.errorCode);
    };

    request.onupgradeneeded = () => {
      const db = request.result;

      const store = db.createObjectStore('paintings', { keyPath: 'description' }); // id is used as unique entry or key to refer to each item in the DB
      store.createIndex('artist', ['artist'], { unique: false }); // easily look up paintings by artist
      store.createIndex('title', ['title'], { unique: true });

      request.onsuccess = function () {
        console.log('Database opened successfully');

        const db = request.result;

        const transaction = db.transaction('paintings', 'readwrite'); // bunch operations together to avoid failing

        const store = transaction.objectStore('paintings'); // create the store from cars objectStore
        const artistIndex = store.index('artist'); // create index 1
        const titleIndex = store.index('title'); //create index 2

        //Put the state into the store
        store.put({ paintingData }); // put the paintingData state into the store
        store.put({
          artist: paintingData.artist,
          title: paintingData.title,
          description: paintingData.description,
          medium: paintingData.medium,
          year: paintingData.year,
          image: paintingData.image
        });

        console.log(store);

        // retrieve data
        const allPaintings = store.getAll();
        allPaintings.onsuccess = function () {
          console.log(allPaintings.result);
        };

        const artistQuery = artistIndex.getAll(['Vincent van Gogh']);
        const titleQuery = titleIndex.get('Something');

        artistQuery.onsuccess = function () {
          console.log('idQuery', artistQuery.result);
        };

        titleQuery.onsuccess = function () {
          console.log('titleQuery', titleQuery.result);
        };

        // 14. Once transaction is complete, we close the DB
        transaction.oncomplete = function () {
          db.close();
        };
      };
    };
  };

  IndexDB;
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
