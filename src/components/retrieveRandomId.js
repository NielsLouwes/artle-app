const retrieveRandomPaintingIdFromCollection = async () => {
  //take the collection of top 100 results and filter to exclude anonymous
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
};

useEffect(() => {
  setLoading(true);
  axios
    .get(
      `https://www.rijksmuseum.nl/api/en/collection?key=f1nLs8AG&material=oil%20paint%20(paint)&material=canvas&yearfrom=1550&yearto=1900&st=Objects&ii=0&ps=100`
    )
    .then((response) => {
      setCollection(response.data.artObjects);
      console.log(response);
      console.log(collection);
      const paintingId = response.data.artObjects[0].objectNumber;
      setArtKey(paintingId);
      return paintingId;
    })
    .then((paintingId) =>
      axios.get(`https://www.rijksmuseum.nl/api/en/collection/${paintingId}?key=f1nLs8AG`)
    )
    .then((response) => {
      console.log(response);
      const paintingYear = response.data.artObject?.dating.sortingDate;
      const artistName = response.data.artObject?.principalMakers[0].name;
      const paintingTitle = response.data.artObject?.title;
      const paintingImageLink = response.data.artObject?.webImage.url;
      const paintingDescription = response.data.artObject?.label.description;
      const physicalMedium = response.data.artObject?.physicalMedium;

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
}, []);
