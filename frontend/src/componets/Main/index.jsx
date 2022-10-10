// Libraries
import { Route, Switch } from "react-router-dom";

// Componets
import Spots from "./Spots";
import Spot from "./details/Spot";
import Reviews from "./Reviews";
import User from "./User"
import About from "./About"

import "./style/Main.css"




function Main() {
    return (
        <div id="main-id-d1">
            <Switch>
                <Route exact path={"/"}>
                    <Spots/>
                </Route>
                <Route exact path={"/spots"}>
                        <Spots/>
                </Route>
                <Route path={"/user"}>
                    <User />
                </Route>
                <Route path={"/spots/:spotId"}>
                    <Spot />
                </Route>
                <Route>
                    <About />
                </Route>
                <Route>
                   <h1>Page Not Found</h1> 
                </Route>
            </Switch>
        </div>
    );
}

export default Main;