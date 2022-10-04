// Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Store
import { getUserSpots, resetSpots } from "../../store/spots";

// Style
import "./style/Spots.css"

function UserSpots () {
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserSpots());
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

export default UserSpots;