const fs = require('fs').promises;

async function readJSON() {
  try {
    const data = await fs.readFile('testdata.json', 'utf8');
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  } catch (err) {
    console.error('Error reading the JSON file:', err);
  }
}

readJSON();
