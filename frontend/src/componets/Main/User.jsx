import { useEffect } from "react";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./style/User.css"

import Spots from "./Spots";
import Reviews from "./Reviews";
import Host from "./Host";

function User(props) {
    return (
        <div id="user-id-d1">
            <div id="user-id-d1d21">
                <NavBar/>
            </div>
            <div id="user-id-d1d22">
                <Switch>
                    <Route exact path={"/user/spots"}>
                        <Spots { ...{ user: true } }/>
                    </Route>
                    <Route exact path={"/user/reviews"}>
                        <Reviews { ...{ user: true } }/>
                    </Route>
                    <Route exact path={"/user/host"}>
                        <Host />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

function NavBar() {
    const [mouseOverNav, setMouseOverNav] = useState(false);
    const [navStyleWidth, setNavStyleWidth] = useState("auto")
    useEffect(() => {
        if(mouseOverNav) setNavStyleWidth("100%");
        else setNavStyleWidth("50px");
    }, [mouseOverNav]);
    
    return (
        <nav id="user-id-d1d21n3" style={{width: navStyleWidth}} onMouseEnter={() => setMouseOverNav(true)} onMouseLeave={() => setMouseOverNav(false)}>
            <NavBarElement { ...{ mouseOverNav, text: "Spots", imgSrc: "/icons/spots.png", path: "/user/spots" } }/>
            <NavBarElement { ...{ mouseOverNav, text: "Reviews", imgSrc: "/icons/reviews.png", path: "/user/reviews" } }/>
            <NavBarElement { ...{ mouseOverNav, text: "Host", imgSrc: "/icons/host.png", path: "/user/host" } }/>
        </nav>
    )
};

function NavBarElement(props) {
    const { mouseOverNav, text, imgSrc, path} = props;
    const history = useHistory();
    const [element, setElement] = useState();
    const handlePath = (e) => history.push(path)
    useEffect(() => {
        if(mouseOverNav) setTimeout(setElement, 400, <span className="nav-bar-element-d1s2">{text}</span>);
        else setTimeout(setElement, 400, <img className="nav-bar-element-d1i2" src={imgSrc} alt="" />);
    }, [mouseOverNav]);
    return (
        <div className="nav-bar-element-d1" onClick={(e) => handlePath(e)}>
            {element}
        </div>
    );
}

export default User;