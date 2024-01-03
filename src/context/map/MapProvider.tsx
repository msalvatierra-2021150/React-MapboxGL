import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "..";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/Directions";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;

            const popup = new Popup()
                .setHTML(`
                    <h6>${place.text}</h6>
                    <p>${place.place_name}</p>
                `);

            const newMarker = new Marker({color: 'red'})
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!);

            newMarkers.push(newMarker);
        }
        dispatch({type: 'setMarkers', payload: newMarkers});
    }, [state.map, places]);

    const setMap = (map: Map) => {
        const myLocationPopup = new Popup()
            .setHTML('<h3>My location</h3>')
            .setMaxWidth('300px')

        new Marker({
            color: 'red',
        })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);

        dispatch({type: 'setMap', payload: map});
    }

    const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const { distance, geometry } =  resp.data.routes[0];
        const {coordinates: coords} = geometry;
        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            kms = kms / 100;

        const bounds = new LngLatBounds(
            start,
            start
        );

        for(const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coords
                    }
                }]
            }
        }
        if (state.map?.getLayer('RouteString')) {
            state.map?.removeLayer('RouteString');
            state.map?.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ff0000',
                'line-width': 3
            }
        });
    }

    return (
    <MapContext.Provider value={{
        ...state,
        setMap,
        getRouteBetweenPoints
    }}>
        {children}
    </MapContext.Provider>
  )
}
