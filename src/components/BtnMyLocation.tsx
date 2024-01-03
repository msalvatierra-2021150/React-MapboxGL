import { useContext } from "react"
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
  const {isMapReady, map} = useContext(MapContext);
  const {userLocation} = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady) return new Error('Map isnt loaded yet');
    if (!userLocation) return new Error('There is no user location');

    map?.flyTo({
      center: [userLocation[1], userLocation[0]]
    })
  }
  return (
    <button className="btn btn-primary text-capitalize"
        style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 999
        }}
        onClick={() => onClick()}
        >
        My current location
    </button>
  )
}
