const retrieveRandomPaintingIdFromCollection = async (collection) => {
  //take the collection of top 100 results and filter to exclude anonymous
  const filteredCollection = await collection.filter(
    (element) => element.principalOrFirstMaker !== 'anonymous'
  );

  // grab the keys from the object
  const filteredCollectionKeys = await Object.keys(filteredCollection);

  //generate random index based on number of keys
  const randIndex = await Math.floor(Math.random() * filteredCollectionKeys.length);

  //select key from the array of keys using the random index
  const randomKey = await filteredCollectionKeys[randIndex];

  //get the painting ID from the key
  const paintingReferenceNumber = await filteredCollection[randomKey];

  const paintingID = await paintingReferenceNumber.objectNumber;
  return paintingID;
};

export default retrieveRandomPaintingIdFromCollection;
