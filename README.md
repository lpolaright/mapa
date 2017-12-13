# mapa

Map web-app on steroids of capabilities,

## Dependencies

- MongoDB installed and running in the background
- Google Maps API key
- Transit Feeds API key
- Transit Feeds feed id you want to fetch

## Installation

1. `git clone`
2. `cd mapa`
3. `npm install`
4. Change `app.config.js` to contain your Gmaps API key, and Transit Feeds API key, along with the url for Transit Feeds.
4. Run `npm run start`
5. Open the browser at `localhost:3000/import`
6. This will start the download and import of GTFS from the transit feed source you specified, once it will be finished (should take around 20 mins), you will have all the data in your MongoDB.

## MongoDB info

- There will be a database called `gtfs` in your mongodb instance.
- Inside that database you'll find all the GTFS collections, you can start querying on them, or extends the `server/index.js` file to query for you using `node-gtfs`.