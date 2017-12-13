import express from 'express';
import path from 'path';
import gtfs from 'gtfs';
import config from '../app.config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import R from 'ramda';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, { useMongoClient: true });

app.use(express.static('public'));
app.use(bodyParser.json());

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

app.post('/ideal-zones', (req, res) => {
  const locA = R.view(R.lensPath(['locations', 0]))(req.body);  
  const locB = R.view(R.lensPath(['locations', 1]))(req.body);
  console.log(locB);
  gtfs.getStops({ within: locA })
    .then(stops => {
      res.status(200).json(stops);
    })
    .catch(err => {
      res.status(200).json(err);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));