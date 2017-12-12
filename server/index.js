import express from 'express';
import path from 'path';
import gtfs from 'gtfs';
import config from '../app.config';
import mongoose from 'mongoose';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, { useMongoClient: true });

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.resolve('public/index.html')));

app.get('/import', (req, res) => {
  gtfs.import(config)
    .then(() => {
      console.log("Import was successful!");
    })
    .catch(err => {
      console.error(err);
    });

  res.send('Import request was submitted successfully!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));