import { useContext, useState } from "react"
import { PlacesContext, MapContext } from "../context"
import { LoadingPlaces } from "./LoadingPlaces"
import { Feature } from "../interfaces/Places"

export const SearchResults = () => {
    const { places, isLoading, userLocation } = useContext(PlacesContext)
    const { map, getRouteBetweenPoints } = useContext(MapContext);
    const [activeId, setActiveId] = useState<string>('')

    const onPlaceClick = (place: Feature) => {
        setActiveId( place.id );
        const [ lng, lat] = place.center;
        map?.flyTo({ center: [lng, lat], zoom: 15 });
    }

    if ( isLoading ) {
        return <LoadingPlaces/>
    }

    if ( places.length === 0 ) {
        return <></>;
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return;
        const [ lng, lat] = place.center;
        getRouteBetweenPoints([userLocation[1], userLocation[0]], [lng, lat]);
    }

    return (
        <ul className="list-group mt-2">
            {
                places.map( place => (
                    <li
                        key={ place.id }
                        className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active' : ''}`}
                        onClick={ () => onPlaceClick( place ) }
                    >
                        <h6 className="mb-1">{ place.place_name }</h6>
                        <p
                            className="mb-1"
                            style={{fontSize: '12px'}}
                        >
                            { place.text }
                        </p>
                        <button
                        onClick = {() => getRoute(place)}
                        className={`btn btn-sm ${ activeId === place.id ? ' btn-outline-light' : ' btn-outline-primary'}`}>
                            Directions
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}
