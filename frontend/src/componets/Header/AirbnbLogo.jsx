import { NavLink } from "react-router-dom";

// Style
import "./style/AirbnbLogo.css"

function AirbnbIcon() {
    return (
        <NavLink id="airbnb-logo-id-nl1" to={"/"}>
            <img id="airbnb-logo-id-nl1i2" src="/airbnb-logo.png" alt="airbnb-logo"/>
        </NavLink>
    );
}

export default AirbnbIcon;