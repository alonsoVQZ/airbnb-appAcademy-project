import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../../misc/Modal"
import { getSpotDetails } from "../../../store/details";
import { deleteSpots } from "../../../store/spots";
import ReviewForm from "../forms/ReviewForm";
import Reviews from "../Reviews";
import SpotForm from "../forms/SpotForm";

import "./style/Spot.css";

function Spot() {
    const spotDetails = useSelector(state => state.details.spot);
    const { ownerId, address, city, state, country, name, description, price, numReviews, avgStarRating, Images = [""], Owner } = spotDetails;
    const user = useSelector(state => state.user.session);
    const [previewImage, setPreviewImage] = useState("");
    const { spotId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch]);
    useEffect(() => {
        setPreviewImage(Images[0].url)
    }, [Images]);
    return (
        <div id="spot-id-d1">
                <div id="spot-id-d1d21">
                    <img id="spot-id-d1d21i3" src={previewImage} alt="" />
                </div>
                <div id="spot-id-d1d22">
                    <DetailsElement { ...{ name, price, description, address, city, state, country, numReviews, avgStarRating } }/>
                    <ReviewsElement />
                    <OwnerOptions />
                </div>
        </div>
    );
}

function DetailsElement({ name, price, description, address, city, state, country }) {
    return (

        <div id="spot-id-d1d22d32">
        <div>
            <span>{name}</span>
            <span>{price}</span>
        </div>
        <p>{description}</p>
                            <div>
                                <span>{`${address}, ${city}, ${state}`}</span>
                                <span>{country}</span>
                            </div>
    </div>
    );
}

function ReviewsElement() {
    const { spotId } = useParams();
    return(
        <div id="reviews-element-id-d1">
            <ReviewForm { ...{ spotId } }/>
            <div id="reviews-element-id-d1d2">
                <Reviews { ...{ spotId } } />
            </div>
        </div>
    )
}

function OwnerOptions() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const handleEdit = () => setModal(true);
    const handleDelete = () => {
        dispatch(deleteSpots(spotId))
        history.push("/user")
    }
    return (
        <div>
            <button type="button" onClick={() => handleEdit()}>Edit</button>
            <button type="button" onClick={() => handleDelete()}>Delete</button>
            {
                modal && <Modal { ...{ setModal, outside: true } }><SpotForm { ...{ edit: true, spotId, setModal } }/></Modal>
            }
        </div>
    )
}

export default Spot;