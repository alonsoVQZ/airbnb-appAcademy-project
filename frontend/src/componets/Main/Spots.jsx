import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import { ShowStarsRating } from "../misc/StarsRating";

import { getSpots } from "../../store/spots";
import { getUserSpots } from "../../store/user";

import "./style/Spots.css"

function Spots({ user = false }) {
    const allSpots = useSelector(state => state.spots);
    const userSpots = useSelector(state => state.user.spots)
    const spots = user ? userSpots : allSpots;
    const dispatch = useDispatch();
    useEffect(() => {
        if(user) dispatch(getUserSpots());
        else dispatch(getSpots())
    }, [dispatch]);
    return (
        <div id="spots-d1">
            {
                spots?.map((spot, i) => <SpotCard key={spot + (i + 1)} { ...{ spot } }/>)
            }
        </div>
        
    );
}

function SpotCard(props) {
    const { spot } = props;
    const { previewImage } = spot;
    return (
        <div className="spot-card-d1">
            <NavLink className="spot-card-d1nl2" to={`/spots/${spot.id}`}>
                <img className="spot-card-d1nl2i3" src={previewImage} alt="" />
                <SpotCardInfo { ...{ spot } } />
            </NavLink>
        </div>
    );
}

function SpotCardInfo(props) {
    const { spot } = props;
    const { city, state, country, avgRating, name, price } = spot;
    const [mouseOver, setMouseOver] = useState(false);
    const [styleTop, setStyleTop] = useState("30px");
    useEffect(() => {
        if(mouseOver) setStyleTop("0px");
        else setStyleTop("50px")
    }, [mouseOver])
    return (
        <div className="spot-card-info-d1">
            <div className="spot-card-info-d1d2" style={ { top: styleTop } } onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
                <div className="spot-card-info-d1d2d31">
                    <img className="spot-card-info-d1d2d31i4" src="/icons/spots.png" alt="" />
                    <div className="spot-card-info-d1d2d31d4">
                        <span>{`${city}, ${state}`}</span>
                        <div className="spot-card-info-d1d2d31d4d5">
                            <span>{country}</span>
                            <ShowStarsRating { ...{ avgRating } }/>
                        </div>
                    </div>
                </div>
                <div className="spot-card-info-d1d2d32">
                    <span>{name}</span>
                    <span>{`$${price}`}</span>
                </div>
            </div>
        </div>
    );
}

export default Spots;