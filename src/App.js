import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import InfoPage from './InfoPage';
import Navbar from './Navbar';

import styled from 'styled-components';
import axios from 'axios';

const Styled = styled.div``;

// const LoadingText = styled.p``;

function App() {
  const [artKey, setArtKey] = useState('');
  const [paintingData, setPaintingData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  // const exampleRijksCall = 'https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=f1nLs8AG';

  //To get Rijks paint data
  // 1. Do API call for collection
  // 2. put collection in collection state
  // 3. spread that collection state and filter it to exclude "anonomous painters"
  // 4. Grab a random objectNumber and use that in another API call to directly for that painting

  // const getCollectionData = () => {
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
  //       console.log(data.artObjects);
  //       console.log(data.artObjects[0].objectNumber); // finding specific paintingID
  //       setCollection(data.artObjects);
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

  // const retrieveRandomPaintingIdFromCollection = async () => {
  //   //take the collection of top 100 results and filter to exclude anonymous
  //   const filteredCollection = await collection.filter(
  //     (element) => element.principalOrFirstMaker !== 'anonymous'
  //   );
  //   console.log(collection);
  //   console.log(filteredCollection); // 98 results

  //   // grab the keys from the object
  //   const filteredCollectionKeys = await Object.keys(filteredCollection);
  //   console.log(filteredCollectionKeys);

  //   //generate random index based on number of keys
  //   const randIndex = await Math.floor(Math.random() * filteredCollectionKeys.length);
  //   console.log(randIndex);

  //   //select key from the array of keys using the random index
  //   const randomKey = await filteredCollectionKeys[randIndex];
  //   console.log(randomKey);

  //   //get the painting ID from the key
  //   const paintingReferenceNumber = await filteredCollection[randomKey];
  //   console.log(paintingReferenceNumber);

  //   const paintingID = await paintingReferenceNumber.objectNumber;
  //   setArtKey(paintingID);
  //   console.log(paintingID); //returns PaintingID to be used for another API call to get image and specific painting data
  // };

  // const getSpecificArtData = async () => {
  //   setLoading(true);
  //   await fetch(`https://www.rijksmuseum.nl/api/en/collection/${artKey}?key=f1nLs8AG`, {
  //     headers: {
  //       'Content-type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   })
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

  //       console.log(paintingYear);
  //       console.log(artistName);
  //       console.log(paintingDescription);

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

  //2nd attempt to chain different API calls and fix errors in console
  // We are chaingin the calls to get a specific art object now. cleaner refactor
  // Still need to find a way to get the randomized function into this call.

  const fetchRandomPainting = () => {};

  const fetchCollection = () => {
    setLoading(true);
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`
      )
      .then((response) => {
        const collection = response.data.artObjects;
        setCollection(collection);
        console.log(response);
        console.log(collection);
        return collection;
      })
      .then(async (collection) => {
        console.log(collection);
        const filteredCollection = await collection.filter(
          (element) => element.principalOrFirstMaker !== 'anonymous'
        );
        console.log(collection);
        console.log(filteredCollection); // 98 results

        // grab the keys from the object
        const filteredCollectionKeys = await Object.keys(filteredCollection);
        console.log(filteredCollectionKeys);

        //generate random index based on number of keys
        const randIndex = await Math.floor(Math.random() * filteredCollectionKeys.length);
        console.log(randIndex);

        //select key from the array of keys using the random index
        const randomKey = await filteredCollectionKeys[randIndex];
        console.log(randomKey);

        //get the painting ID from the key
        const paintingReferenceNumber = await filteredCollection[randomKey];
        console.log(paintingReferenceNumber);

        const paintingID = await paintingReferenceNumber.objectNumber;
        setArtKey(paintingID);
        console.log(paintingID); //returns PaintingID to be used for another API call to get image and specific painting data
        return paintingID;
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

            console.log(paintingYear);
            console.log(artistName);
            console.log(paintingDescription);

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

  // console.log(collection);

  // const getCollectionData = () => {
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
  //       console.log(data.artObjects);
  //       console.log(data.artObjects[0].objectNumber); // finding specific paintingID
  //       setCollection(data.artObjects);
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

  // const retrieveRandomPaintingIdFromCollection = async (collection) => {
  //   //take the collection of top 100 results and filter to exclude anonymous
  //   const filteredCollection = await collection.filter(
  //     (element) => element.principalOrFirstMaker !== 'anonymous'
  //   );
  //   console.log(collection);
  //   console.log(filteredCollection); // 98 results

  //   // grab the keys from the object
  //   const filteredCollectionKeys = await Object.keys(filteredCollection);
  //   console.log(filteredCollectionKeys);

  //   //generate random index based on number of keys
  //   const randIndex = await Math.floor(Math.random() * filteredCollectionKeys.length);
  //   console.log(randIndex);

  //   //select key from the array of keys using the random index
  //   const randomKey = await filteredCollectionKeys[randIndex];
  //   console.log(randomKey);

  //   //get the painting ID from the key
  //   const paintingReferenceNumber = await filteredCollection[randomKey];
  //   console.log(paintingReferenceNumber);

  //   const paintingID = await paintingReferenceNumber.objectNumber;
  //   setArtKey(paintingID);
  //   console.log(paintingID); //returns PaintingID to be used for another API call to get image and specific painting data
  //   return paintingID;
  // };

  const getSpecificArtData = async (paintingID) => {
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

        console.log(paintingYear);
        console.log(artistName);
        console.log(paintingDescription);

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

  // useEffect(() => {
  //   getCollectionData();
  // }, []);

  // useEffect(() => {
  //   retrieveRandomPaintingIdFromCollection();
  // }, [collection]);

  // useEffect(() => {
  //   getSpecificArtData();
  // }, [artKey]);

  // console.log('', paintingData);

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
