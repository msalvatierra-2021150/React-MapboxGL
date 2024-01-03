import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
    const debounce = useRef<NodeJS.Timeout>();
    const {searchPlacesByTerm} = useContext(PlacesContext);

    /** Search once the use has stopped typing for 1 second */
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounce.current) {
            clearTimeout(debounce.current);
        }

        debounce.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 1000);
    }
  return (
    <div className="search-container">
        <input
            type="text"
            className="form-control"
            placeholder="Search for a place..."
            onChange={(event) => handleSearch(event)}
            />
        <SearchResults/>
    </div>
  )
}
