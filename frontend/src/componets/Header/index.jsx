// Components
import AirbnbIcon from "./AirbnbLogo";
import NavBar from "./NavBar";

// Style
import './style/Header.css';

function Header() {
    return (
        <header id="header-id-h1">
            <AirbnbIcon />
            <NavBar />
        </header>
    );
}

export default Header;