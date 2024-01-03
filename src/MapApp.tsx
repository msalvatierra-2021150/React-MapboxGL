import { BtnMyLocation, SearchBar } from "./components";
import { MapProvider, PlacesProvider } from "./context"
import { HomeScreen } from "./screens/HomeScreen"

import './styles/custom-styles.css'

export const MapApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <BtnMyLocation/>
        <SearchBar/>
        <HomeScreen/>
      </MapProvider>
    </PlacesProvider>
  )
}
