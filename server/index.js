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

const getRoutesForStops = res => stops => {
  const routesPromises = stops.map(stop => 
    gtfs.getRoutes({ stop_id: stop.stop_id }) 
  );
  Promise.all(routesPromises)
    .then(stopRoutes => {
      // res.status(200).json(stopRoutes);
      const stopsPromises = stopRoutes.map(routes => 
        routes.map(route => 
          gtfs.getStops({ 
            agency_key: 'israeli-transport',
            route_id: route.route_id,
            direction_id: 0
          })
        )
      );
      const promisesArray = R.flatten(stopsPromises);
      Promise.all(promisesArray)
        .then(stops_two => {
          res.status(200).json(stops_two);
        })
        .catch(err => {
          res.status(200).json(err);
        });
    })
    .catch(err => {
      res.status(200).json(err);
    })
}

app.post('/ideal-zones', (req, res) => {
  const locA = R.view(R.lensPath(['locations', 0]))(req.body);
  const locB = R.view(R.lensPath(['locations', 1]))(req.body);
  console.log(locB);
  gtfs.getStops({ within: locA }, { _id: 1, stop_id: 1, loc: 1 })
    .then(getRoutesForStops(res))
    .catch(err => {
      res.status(200).json(err);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));