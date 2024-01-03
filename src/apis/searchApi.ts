import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        access_token: 'pk.eyJ1IjoibXNhbHZhdGllcnJhLWRldiIsImEiOiJjbHE3NGJ1a3gwenFiMmlsazUyMGFvNXY5In0.rhJ9udJ8ItTeD2fns42z1w',
        limit: 5,
        language: 'es'
    }
});

export default searchApi;