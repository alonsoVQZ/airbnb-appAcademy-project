import { useEffect } from "react";
import { useState } from "react";
import "./style/User.css"

import Profile from "./Profile";
import Spots from "./Spots";
import Reviews from "./Reviews";
import Bookings from "./Bookings";

function User(props) {
    const { componentSelected = "Spots" } = props;
    const [component, setComponent] = useState();
    useEffect(() => {
        setComponent(userSetComponent(componentSelected));
    }, []);
    return (
        <div id="user-id-d1">
            <div id="user-id-d1d21">
                <NavBar { ...{ setComponent } } />
            </div>
            <div id="user-id-d1d22">
                {component}
            </div>
        </div>
    );
};

function NavBar(props) {
    const { setComponent } = props;
    const [mouseOverNav, setMouseOverNav] = useState(false);
    const [navStyleWidth, setNavStyleWidth] = useState("auto")
    useEffect(() => {
        if(mouseOverNav) setNavStyleWidth("100%");
        else setNavStyleWidth("50px");
    }, [mouseOverNav]);
    
    return (
        <nav id="user-id-d1d21n3" style={{width: navStyleWidth}} onMouseEnter={() => setMouseOverNav(true)} onMouseLeave={() => setMouseOverNav(false)}>
            <NavBarElement { ...{ mouseOverNav, text: "Profile", imgSrc: "/icons/robot.png", setComponent } }/>
            <NavBarElement { ...{ mouseOverNav, text: "Spots", imgSrc: "/icons/spots.png", setComponent } }/>
            <NavBarElement { ...{ mouseOverNav, text: "Reviews", imgSrc: "/icons/reviews.png", setComponent } }/>
            <NavBarElement { ...{ mouseOverNav, text: "Bookings", imgSrc: "/icons/bookings.png", setComponent } }/>
        </nav>
    )
};

function NavBarElement(props) {
    const { mouseOverNav, text, imgSrc, setComponent} = props;
    const [element, setElement] = useState();
    const handleSetComponent = () => setComponent(userSetComponent(text))
    useEffect(() => {
        if(mouseOverNav) setTimeout(setElement, 400, <span className="nav-bar-element-d1s2">{text}</span>);
        else setTimeout(setElement, 400, <img className="nav-bar-element-d1i2" src={imgSrc} alt="" />);
    }, [mouseOverNav]);
    return (
        <div className="nav-bar-element-d1" onClick={() => handleSetComponent()}>
            {element}
        </div>
    );
}

function userSetComponent(componentSelected) {
    if(componentSelected === "Profile") return <Profile />;
    if(componentSelected === "Spots") return <Spots />;
    if(componentSelected === "Reviews") return <Reviews />;
    if(componentSelected === "Bookings") return <Bookings />;
}


export default User;