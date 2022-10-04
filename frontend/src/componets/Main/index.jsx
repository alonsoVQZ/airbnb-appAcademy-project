// Libraries
import { Route, Switch } from "react-router-dom";

// Componets
import Spots from "./Spots";
import SpotDetails from "./SpotDetails";
import UserSpots from "./UserSpots";


function Main() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Spots/>
                </Route>
                <Route path={"/user/spots"}>
                    <UserSpots />
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