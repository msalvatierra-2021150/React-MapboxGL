import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapApp } from './MapApp';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibXNhbHZhdGllcnJhLWRldiIsImEiOiJjbHE3NGJ1a3gwenFiMmlsazUyMGFvNXY5In0.rhJ9udJ8ItTeD2fns42z1w';


if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapApp/>
  </React.StrictMode>,
)
