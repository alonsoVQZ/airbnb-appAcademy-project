import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from 'react-router-dom';

import { getUserSpots } from "../../../store/user";

import "./style/Spots.css"

function Spots() {
    const spots = useSelector(state => state.userInfo.spots);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserSpots())
    }, []);
    return (
            <div id="spots-d1">
        {
            spots?.map((spot, i) => <SpotCard { ...{ spot } }/>)
        }
        </div>
        
    );
}

function SpotCard(props) {
    const { spot } = props;
    const [mouseOverDetailts, setMouseOverDetailts] = useState(false);
    const [heightStyle, setHeightStyle] = useState("75px")
    useEffect(() => {
        if(mouseOverDetailts) setHeightStyle("100px");
        else setHeightStyle("75px")
    }, [mouseOverDetailts])
    return (
        <NavLink className="spot-card-nl1" to={`/spots/${spot.id}`}>
            {/* <div className="spot-card-d1">
                <div className="spot-card-d1d2" style={ {height: heightStyle } } onMouseEnter={() => setMouseOverDetailts(true)} onMouseLeave={() => setMouseOverDetailts(false)}>
                    <div className="spot-card-d1d2d3">
                        <div className="spot-card-d1d2d3d41">
                            <img className="spot-card-d1d2d31i4" src="/icons/spots.png" alt="" />
                        </div>
                        <div className="spot-card-d1d2d3d42">
                            <span>{`${spot.city}, ${spot.state}`}</span>
                            <div className="spot-card-d1d2d3d42d5">
                                <span>{`${spot.country}`}</span>
                                <span>{`Reviews: ${spot.avgRating || 0}`}</span>
                            </div>
                        </div>
                    </div>
                    {
                        mouseOverDetailts && <SpotOwnerOptions />
                    }
                </div>
            </div> */}
        </NavLink>
    );
}

function SpotOwnerOptions() {
    return (
        <div className="spot-owner-options-d1">
        </div>
    );
}

export default Spots;