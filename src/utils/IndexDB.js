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

  request.onupgradeneeded = async () => {
    const db = request.result;

    const store = db.createObjectStore('paintings', { keyPath: 'description' }); // id is used as unique entry or key to refer to each item in the DB
    store.createIndex('artist', ['artist'], { unique: false }); // easily look up paintings by artist
    store.createIndex('title', ['title'], { unique: true });

    request.onsuccess = async function () {
      console.log('Database opened successfully');

      const db = request.result;

      const transaction = db.transaction('paintings', 'readwrite'); // bunch operations together to avoid failing

      const store = transaction.objectStore('paintings'); // create the store from paintings objectStore
      const artistIndex = store.index(paintingData.artist); // create index 1
      const titleIndex = store.index(paintingData.title); //create index 2
      const descriptionIndex = store.index('description');
      const mediumIndex = store.index('medium');

      //Put the state into the store
      // store.put({ paintingData }); // put the paintingData state into the store
      await store.put({
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

// function IndexDB() {
//   // 1. Need a variable that refers to indexDB. set is equal to multiple version for different browsers users may use.

//   const indexedDB =
//     window.indexedDB ||
//     window.mozIndexedDB ||
//     window.webkitIndexedDB ||
//     window.msIndexedDB ||
//     window.shimIndexedDB;

//   if (!indexedDB) {
//     console.log('IndexedDB could not be found in this browser.');
//   }

//   // 2. set request variable equal to indexDB open, name it, second value is version number (name, version)
//   const request = indexedDB.open('CarsDatabase', 1);

//   // 3. handle errors before Anything
//   request.onerror = (event) => {
//     console.error('Database error: ' + event.target.errorCode);
//   };

//   // 4. create upgrade function for when database is upgraded in version OR the firsst time the DB is start/

//   request.onupgradeneeded = () => {
//     // 5. Save the IDBDatabase interface
//     const db = request.result;

//     // 6. Create an objectStore for this database, include a keyPath like ID to be a unique identifiable thing
//     // 7. Define indexed searches such as color and make of cars
//     const store = db.createObjectStore('cars', { keyPath: 'id' }); // id is ussed as unique entry or key to refer to each item in the DB
//     store.createIndex('cars_colour', ['colour'], { unique: false }); // easily look up cars by color
//     store.createIndex('colour_and_make', ['colour', 'make'], { unique: false }); // look up cars by colour and make
//   };

//   // 8. On success if responsible for our operations to and from the index DB, we set up our store and create our indexes
//   request.onsuccess = function () {
//     console.log('Database opened successfully');

//     const db = request.result;

//     const transaction = db.transaction('cars', 'readwrite'); // bunch operations together to avoid failing

//     const store = transaction.objectStore('cars'); // create the store from cars objectStore
//     const colourIndex = store.index('cars_colour'); // create index 1
//     const makeModelIndex = store.index('colour_and_make'); //create index 2

//     // 9. Add data to database but adding a method to our store. PUT updates a given record in a database or insert a new record is given item does not already exist
//     store.put({ id: 1, colour: 'Red', make: 'Toyota' });
//     store.put({ id: 2, colour: 'Red', make: 'Kia' });
//     store.put({ id: 3, colour: 'Blue', make: 'Honda' });
//     store.put({ id: 4, colour: 'Silver', make: 'Subaru' });

//     // 10. retrieving data
//     const idQuery = store.get(4); // retrieve car with id 4
//     const colourQuery = colourIndex.getAll(['Red']); // use our colourIndex set up variable to get all cars with color "Red"
//     const colourMakeQuery = makeModelIndex.get(['Blue', 'Honda']); // use our makeModelIndex we set up and retrieve first result

//     // 11. each query needs and onsuccess function check if it worked and log its result
//     // 12. All queries needs to be successful to work
//     // 13. You can group them in different transactions

//     idQuery.onsuccess = function () {
//       console.log('idQuery', idQuery.result);
//     };
//     colourQuery.onsuccess = function () {
//       console.log('colourQuery', colourQuery.result);
//     };
//     colourMakeQuery.onsuccess = function () {
//       console.log('colourMakeQuery', colourMakeQuery.result);
//     };

//     const allCars = store.getAll();
//     allCars.onsuccess = function () {
//       console.log(allCars.result);
//     };

//     // 14. Once transaction is complete, we close the DB
//     transaction.oncomplete = function () {
//       db.close();
//     };
//   };
// }

// export default IndexDB;
