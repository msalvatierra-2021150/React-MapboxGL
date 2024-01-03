import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context";
import { Map } from 'mapbox-gl';
import { Loading } from ".";

export const MapView = () => {
    const { isLoading, userLocation } = useContext(PlacesContext);
    const {setMap} = useContext(MapContext);
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
              container: mapDiv.current!, // container ID
              style: 'mapbox://styles/mapbox/streets-v12', // style URL
              center: [userLocation![1], userLocation![0]], // starting position [lng, lat]
              zoom: 9, // starting zoom
            });
            setMap(map);
          }
      }, [isLoading]);

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div ref={mapDiv} className="vh-100 vw-100 top-0 start-0 position-fixed">
            {userLocation?.join(',')}
        </div>
    )
}
