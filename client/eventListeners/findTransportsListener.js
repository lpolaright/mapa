import fetchApiKey from '../fetchers/fetchApiKey';
import { castObject } from '../casts/castObject';
import axios from 'axios';

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
      console.log(response);
    });
  });
}

export default findTransportsListener;