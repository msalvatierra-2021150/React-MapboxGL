import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        access_token: 'pk.eyJ1IjoibXNhbHZhdGllcnJhLWRldiIsImEiOiJjbHE3NGJ1a3gwenFiMmlsazUyMGFvNXY5In0.rhJ9udJ8ItTeD2fns42z1w',
        alternatives: false,
        geometries: 'geojson',
        overview: 'full',
        steps: false,
        language: 'en'
    }
});

export default directionsApi;