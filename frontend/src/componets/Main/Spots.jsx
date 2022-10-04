// Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Store
import { getSpots, getUserSpots, resetSpots } from "../../store/spots";

// Style
import "./style/Spots.css"

function Spots() {
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots());
        return () => dispatch(resetSpots())
    }, []);
    return (
        <div id="spots-container">
            {
                spots.map(element => {
                    return <NavLink to={`/spot/${element.id}`}>{element.name}</NavLink>
                })
            }
        </div>
    );
}

export default Spots;