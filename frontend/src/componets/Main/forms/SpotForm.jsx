// Style
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/SpotForm.css";
import { putSpots, postSpots } from "../../../store/spots";
import { getSpotDetails, resetSpotDetails } from "../../../store/details"
import { useHistory, useParams } from "react-router-dom";
import { FormInput, FormSelect, FormTextArea } from "./FormElements";

function SpotForm(props) {
    const { edit, spotId, setModal } = props;

    // Hooks
    const spotDetails =  useSelector(state => state.details.spot);
    const dispatch = useDispatch();
    const history = useHistory();
    const [backendErrors, setBackendErrors] = useState([]);
    const [address, setAddress] = useState(edit ? spotDetails.address : "");
    const [city, setCity] = useState(edit ? spotDetails.city : "");
    const [state, setState] = useState(edit ? spotDetails.state : "");
    const [country, setCountry] = useState(edit ? spotDetails.country : "");
    const [lat, setLatitude] = useState(edit ? spotDetails.lat : 0);
    const [lng, setLongitude] = useState(edit ? spotDetails.lng : 0);
    const [name, setName] = useState(edit ? spotDetails.name : "");
    const [description, setDescription] = useState(edit ? spotDetails.description : "");
    const [price, setPrice] = useState(edit ? spotDetails.price : 0);
    
    // Functions

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotSubmitted = { address, city, state, country, lat, lng, name, description, price };
        console.log(spotSubmitted)
        if(edit) {
            const response = await dispatch(putSpots(spotId, spotSubmitted));
            if(response?.statusCode >= 400) setBackendErrors(response);
            else setModal(false);
        } else {
            const response = await dispatch(postSpots(spotSubmitted));
            if(response?.statusCode >= 400) setBackendErrors(response);
            else history.push("/spots")
        }
    }
    
    useEffect(() => {
        if(edit) dispatch(getSpotDetails(spotId));
    }, [dispatch]);
    return (
        <div id="spot-form-id-d1">
            <form id="spot-form-id-d1f2" onSubmit={(e) => handleSubmit(e)}>
                <div id="spot-form-id-d1f2d31">
                    <div className="spot-form-d1f2d31d4">
                        <FormInput { ...{ text: "Address", value: address, type: "text", setValue: setAddress, inputPlaceholder: "" } }/>
                        <FormInput { ...{ text: "City", value: city, type: "text", setValue: setCity, inputPlaceholder: "" } }/>
                        <FormInput { ...{ text: "State", value: state, type: "text", setValue: setState, inputPlaceholder: "" } }/>
                        <FormSelect { ...{ text: "State", value: country, options: ["Mexico", "Canada", "United States"], setValue: setCountry } }/>
                        <FormInput { ...{ text: "Latitude", value: lat, type: "number", setValue: setLatitude, inputPlaceholder: "" } }/>
                        <FormInput { ...{ text: "Longitude", value: lng, type: "number", setValue: setLongitude, inputPlaceholder: "" } }/>
                    </div>
                    <div className="spot-form-d1f2d31d4">
                        <FormInput { ...{ text: "Name", value: name, type: "text", setValue: setName, inputPlaceholder: "" } }/>
                        <FormTextArea { ...{ text: "Description", value: description, setValue: setDescription, inputPlaceholder: "" } }/>
                        <FormInput { ...{ text: "Price", value: price, type: "number", setValue: setPrice, inputPlaceholder: "" } }/>
                    </div>

                </div>
                <div id="spot-form-idf2d32">
                    <button type="submit" className="spot-form-button">Submit</button>
                </div>
            </form>
            {
                (backendErrors.length > 0) && <BackendErrors { ...{ backendErrors , setBackendErrors} }/>
            }
        </div>
    );
};

function BackendErrors(props) {
    const { backendErrors, setBackendErrors } = props;
    const handleClose = () => setBackendErrors([])
    return (
        <div id="backend-errors-container">
            <div id="backend-errors-header">
                <img id="backend-errors-icon" src="/forbidden-icon.png" alt="forbidden"/>
                <span id="backend-errors-title">Backend error(s)</span>
            </div>
            <ul id="backend-errors-list">
                {
                    backendErrors.map((element, i) => {
                        return (
                            <li className="backend-errors-li">
                                <span className="backend-errors" key={element + (i + 1)}>{element}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <button id="backend-errors-button" type="button" onClick={() => handleClose()}>Close</button>
        </div>
    )
}

export default SpotForm;