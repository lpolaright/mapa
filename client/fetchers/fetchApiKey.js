const fetchApiKey = () => new URLSearchParams(document.location.search).get('API_KEY');

export default fetchApiKey;