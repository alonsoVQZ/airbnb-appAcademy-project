// Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Store
import { getSpotDetails, removeSpot, resetSpot } from "../../store/spot";
import { getSpotReviews } from "../../store/reviews";

// Componets
import Modal from "../misc/Modal";
import SpotForm from "./SpotForm";

// Style
import "./style/SpotDetails.css"


function SpotDetails() {
    const spotDetails = useSelector(state => state.spot);
    const user = useSelector(state => state.user);
    const [owner, setOwner] = useState(false);
    const [options, setOptions] = useState();
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        return () => dispatch(resetSpot());
    }, []);

    useEffect(() => {
        if(spotDetails.ownerId === user.id) setOwner(true);
        return () => setOwner(false)
    }, [spotDetails]);

    useEffect(() => {
        if(owner) setOptions(<HostOptions />);
        else setOptions(<GuestOptions />);
        return () => setOptions(<div></div>);
    }, [owner]);

    return (
        <div id="spot-details-container">
            {spotDetails.name}
            {options}
        </div>
    );
}

function HostOptions() {
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const handleEdit = () => {
        setModalContent(<EditSpot {...{setModal}}/>)
        setModal(!modal)
    }
    const handleRemove = () => {
        setModalContent(<RemoveSpot {...{setModal}}/>)
        setModal(!modal)
    }
    return (
        <div>
            <button onClick={() => handleEdit()}>Edit</button>
            <button onClick={() => handleRemove()}>Remove</button>
            {
                modal && <Modal {...{setModal, outside: true}}>{modalContent}</Modal>
            }
        </div>
    );
}

function RemoveSpot(props) {
    const { setModal } = props;
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleCancel = () => setModal(false);
    const handleConfirm = () => {
        dispatch(removeSpot(spotId));
        history.push("/user/spots");
    };
    return (
        <div id="remove-spot-container">
            <h1>Remove Spot</h1>
            <div id="remove-spot-options">
                <span id="remove-spot-cancel" className="remove-spot-option" onClick={() => handleCancel()}>Cancel</span>
                <span id="remove-spot-confirm" className="remove-spot-option" onClick={() => handleConfirm()}>Confirm</span>
            </div>
        </div>
    );
}

function EditSpot(props) {
    const { setModal } = props;
    return <SpotForm {...{formType: "Edit", setModal}}/>
}

function GuestOptions() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const handleReviews = () => {
        dispatch(getSpotReviews(spotId))
    }
    return (
        <div>
            <button type="button" onClick={() => handleReviews()}>Reviews</button>
            <button onClick={() => console.log()}>Book</button>
        </div>
    );
}

export default SpotDetails;