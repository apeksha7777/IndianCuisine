// app.js

const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const cors = require('cors');
const { csvToJson } = require('./Services/jsonService');
const indianCuisineRoutes = require('./Routes/indianCuisineRoutes');


const csvFilePath = 'indian_food.csv';
const outputFile = 'output.json';

if (!fs.existsSync(outputFile)){
csvToJson(csvFilePath)
  .then((jsonObject) => {
    
const jsonString = JSON.stringify(jsonObject, null, 2);

// Write to the output file
fs.writeFile(outputFile, jsonString, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('JSON written to', outputFile);
  }
});
  })
  .catch((error) => {
    console.error('Error converting CSV to JSON:', error);
  });
}

app.use(cors());
app.use(indianCuisineRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
