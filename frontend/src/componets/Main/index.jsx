// Libraries
import { Route, Switch } from "react-router-dom";

// Componets
import Spots from "./Spots";
import SpotDetails from "./SpotDetails";
import User from "./User/index";

import "./style/Main.css"




function Main() {
    return (
        <div id="main-d1">
            <Switch>
                <Route exact path={"/"}>
                    <Spots/>
                </Route>
                <Route path={"/user"}>
                    <User />
                </Route>
                <Route path={"/spot/:spotId"}>
                    <SpotDetails />
                </Route>
                <Route>
                   <h1>Page Not Found</h1> 
                </Route>
            </Switch>
        </div>
    );
}

export default Main;