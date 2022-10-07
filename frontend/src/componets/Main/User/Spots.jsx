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
        <div className="spot-card-d1">
            <NavLink className="spot-card-d1nl2" to={`/spots/${spot.id}`}>
                <img className="spot-card-d1nl2i3" src="" alt="" />
                <SpotCardInfo { ...{ spot } } />
            </NavLink>
        </div>
    );
}

function SpotCardInfo(props) {
    const { spot } = props;
    const { city, state, country, avgRating, name, price } = spot;
    const [] = useState(false);
    const [heightStyle, setHeightStyle] = useState("75px")
    return (
        <div className="spot-card-info-d1">
            <div className="spot-card-info-d1d2">
                <div className="spot-card-info-d1d2d31">
                    <img className="spot-card-info-d1d2d31i4" src="" alt="" />
                    <div className="spot-card-info-d1d2d31d4">
                        <span>{`${city}, ${state}`}</span>
                        <div>
                            <span>{country}</span>
                            <span>{(avgRating || 0)}</span>
                        </div>
                    </div>
                </div>
                <div className="spot-card-info-d1d2d32">
                    <span>{name}</span>
                    <span>{price}</span>
                </div>
            </div>
        </div>
    );
}

export default Spots;