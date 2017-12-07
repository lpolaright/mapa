import fetchApiKey from '../fetchers/fetchApiKey';
import { castObject } from '../casts/castObject';
import axios from 'axios';
import * as R from 'ramda';

const locationLens = R.lensPath(['data', 'results', 0, 'geometry', 'location']);

const findTransportsListener = (findTransportElement, addressElement) => {
  findTransportElement.addEventListener('click', (event) => {
    const address = addressElement.value;
    const key = fetchApiKey();
    const geoLocationApiPath = "https://maps.googleapis.com/maps/api/geocode/json";
    const geoLocationParams = {
      address,
      key
    };
    const geoLocationUrlParams = castObject(geoLocationParams).toUrlParams();
    const apiCallPath = [geoLocationApiPath, '?', geoLocationUrlParams].join('');
    axios.get(apiCallPath).then(response => {
      const location = R.view(locationLens, response);
    });
  });
}

export default findTransportsListener;