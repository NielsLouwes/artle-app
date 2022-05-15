const retrieveRandomPaintingIdFromCollection = async (collection) => {
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
  console.log(paintingID); //returns PaintingID to be used for another API call to get image and specific painting data
  return paintingID;
};

export default retrieveRandomPaintingIdFromCollection;
