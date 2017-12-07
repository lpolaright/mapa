import fetchApiKey from '../fetchers/fetchApiKey';

const findTransportsListener = (findTransportElement, addressElement) => {
  findTransportElement.addEventListener('click', (event) => {
    const address = addressElement.value;
    console.log(address);
  });
}

export default findTransportsListener;