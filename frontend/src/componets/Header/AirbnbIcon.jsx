import { NavLink } from "react-router-dom";

// Style
import "./style/AirbnbIcon.css"

function AirbnbIcon() {
    return (
        <div id="airbnbIconContainer">
            <NavLink to={"/"}>
                <img id="airbnbIcon" src="/airbnb-logo.png" alt="airbnb-logo"/>
            </NavLink>
        </div>
    );
}

export default AirbnbIcon;