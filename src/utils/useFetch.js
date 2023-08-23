import axios from "axios";
import { useState } from "react";
import retrieveRandomPaintingIdFromCollection from "./retrieveRandomId";

export const useFetch = () => {
  const [paintingData, setPaintingData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
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
      .then((paintingID) => {
        fetch(
          `https://www.rijksmuseum.nl/api/en/collection/${paintingID}?key=f1nLs8AG`,
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
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
              image: paintingImageLink,
            });
          });
          // console.log('paintingData insinde hOOK', paintingData);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        }
        console.error("Request failed", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return {
    paintingData,
    loading, 
    error,
    fetchData
  }
};
