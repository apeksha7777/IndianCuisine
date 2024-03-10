// jsonService.js

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const outputFile = require('../output.json')



function csvToJson(csvFilePath) {
    const jsonData = [];  
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
         
          row['ingredients'] = row['ingredients'].split(',');
          jsonData.push(row);
        })
        .on('end', () => {
          resolve(jsonData);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

module.exports = {
  
  csvToJson
};
