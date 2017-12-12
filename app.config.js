export default {
    gmaps_api_key: 'YOUR_KEY_HERE',
    transit_api_key: 'YOUR_KEY_HERE',
    mongoUrl: "mongodb://localhost:27017/gtfs",
    agencies: [
      {
        agency_key: "a-name",
        url: "https://api.transitfeeds.com/v1/getLatestFeedVersion?key=<YOUR_KEY_HERE>&feed=<THE_WANTED_FEED_HERE>"
      }
    ]
}