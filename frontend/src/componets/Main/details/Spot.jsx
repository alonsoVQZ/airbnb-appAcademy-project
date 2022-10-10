import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../../misc/Modal"
import { getSpotDetails, resetSpotDetails } from "../../../store/details";
import { deleteSpots } from "../../../store/spots";
import ReviewForm from "../forms/ReviewForm";
import Reviews from "../Reviews";
import SpotForm from "../forms/SpotForm";
import { ShowStarsRating } from "../../misc/StarsRating";
import "./style/Spot.css";

function Spot() {
    const spotDetails = useSelector(state => state.details.spot);
    const { ownerId, Images = [""], Owner } = spotDetails;
    const user = useSelector(state => state.user.session);
    const [previewImage, setPreviewImage] = useState("");
    const { spotId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        return () => dispatch(resetSpotDetails())
    }, [dispatch]);
    useEffect(() => {
        setPreviewImage(Images[0]?.url)
    }, [Images]);
    return (
        <div id="spot-id-d1">
                <div id="spot-id-d1d21">
                    <img id="spot-id-d1d21i3" src={previewImage} alt="" />
                </div>
                <div id="spot-id-d1d22">
                    <SpotDetailsElement { ...{ ...spotDetails } }/>
                    <ReviewsElement { ...{ ownerId, userId: user.id} }/>
                    {
                        (ownerId === user.id) && <OwnerOptions />
                    }   
                </div>
        </div>
    );
}

function SpotDetailsElement({ address, city, state, country, name, description, price, numReviews, avgStarRating }) {
    return (

        <div id="spot-details-element-id-d1">
            <div id="spot-details-element-id-d1d21">
                <div className="spot-details-element-d1d21d3">
                    <span>{name}</span>
                    <ShowStarsRating { ...{ numReviews, avgStarRating, details: true } }/>
                </div>
                <div className="spot-details-element-d1d21d3">
                    <span>{`$${price}`}</span>
                </div>
            </div>
            <p id="spot-details-element-id-d1p2">{description}</p>
            <div id="spot-details-element-id-d1d22">
                <span>{`${address}, ${city}, ${state}`}</span>
                <span>{country}</span>
            </div>
        </div>
    );
}

function ReviewsElement(props) {
    const { ownerId, userId} = props;
    const { spotId } = useParams();
    return(
        <div id="reviews-element-id-d1">
            {
                (ownerId !== userId) && <ReviewForm { ...{ spotId } }/>
            }
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
        history.push("/user/spots")
    }
    return (
        <div className="owner-options-d1">
            <button className="owner-options-d1b2" type="button" onClick={() => handleEdit()}>Edit</button>
            <button className="owner-options-d1b2" type="button" onClick={() => handleDelete()}>Delete</button>
            {
                modal && <Modal { ...{ setModal, outside: true } }><SpotForm { ...{ edit: true, spotId, setModal } }/></Modal>
            }
        </div>
    )
}

export default Spot;