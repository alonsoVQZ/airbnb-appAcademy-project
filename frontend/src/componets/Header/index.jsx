// Components
import AirbnbIcon from "./AirbnbLogo";
import NavBar from "./NavBar";

// Style
import './style/Header.css';

// Context
import { UserProvider } from "../../context/UserContext";

function Header() {
    return (
        <UserProvider>
            <header id="header-id-h1">
                <AirbnbIcon />
                <NavBar />
            </header>
        </UserProvider>
    );
}

export default Header;