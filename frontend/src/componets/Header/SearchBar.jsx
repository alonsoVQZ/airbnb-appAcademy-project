
// Style
import "./style/SearchBar.css";

function SearchBar() {
    return (
        <div id="searchBarContainer">
            <div id="searchBarNav">
                <span className="searchSpan">Where</span>
                <span>|</span>
                <span className="searchSpan">When</span>
                <span>|</span>
                <span className="searchSpan">Who</span>
                <span>|</span>
                <span className="searchSpan">?</span>
            </div>
        </div>
    );
}

export default SearchBar;