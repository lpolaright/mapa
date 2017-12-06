import { castObject } from './casts/castObject';

const GMAPS_SCRIPT_PATH = 'https://maps.googleapis.com/maps/api/js';

const createGmapsScript = () => {
  const key = new URLSearchParams(document.location.search).get('API_KEY');
  const callback = "initMap";
  const params = {
    key,
    callback
  };
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  const scriptParams = castObject(params).toUrlParams();
  script.type = 'text/javascript';
  script.src = GMAPS_SCRIPT_PATH + '?' + scriptParams;
  script.async = true;
  script.defer = true;
  body.append(script);
};

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

window.initMap = initMap;

createGmapsScript();