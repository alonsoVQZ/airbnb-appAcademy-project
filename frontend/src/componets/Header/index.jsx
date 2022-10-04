// Components
import AirbnbIcon from "./AirbnbIcon";
import SearchBar from "./SearchBar";
// import NavBar from "./NavBar";
import NavBar from "./NavBar";

// Style
import './style/Header.css';

// Context
import { UserProvider } from "../../context/UserContext";

function Header() {
    return (
        <UserProvider>
            <header>
                <div className="headerContainer">
                    <AirbnbIcon />
                    <SearchBar />
                    <NavBar />
                </div>
            </header>
        </UserProvider>
    );
}

export default Header;