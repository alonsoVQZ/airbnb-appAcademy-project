// Style
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/SpotForm.css";
import { putSpots, postSpots } from "../../../store/spots";
import { getSpotDetails, resetSpotDetails } from "../../../store/details"
import { useHistory, useParams } from "react-router-dom";
import { FormInput, FormSelect, FormTextArea } from "./FormElements";
import { BackendErrors, InputError } from "../../misc/Errors";


function SpotForm(props) {
    const { edit, spotId, setModal } = props;

    // Hooks
    const spotDetails =  useSelector(state => state.details.spot);
    const dispatch = useDispatch();
    const history = useHistory();
    const [disableButton, setDistableButton] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});
    const [frontendErrors, setFrontendErrors] = useState({});
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
        let counter = 0;
        const errors = {
            address: {},
            city: {},
            state: {},
            lat: {},
            lng: {},
            name: {},
            description: {},
            price: {}
        };
        if(address.length < 5) errors.address.min = "Addres min length is 5";
        if(address.length > 50) errors.address.max = "Addres max length is 50";
        if(!address.trim().length) errors.address.blank = "Addres must start with a letter";
        if(city.length < 5) errors.city.min = "City min length is 5";
        if(city.length > 50) errors.city.max = "City max length is 50";
        if(!city.trim().length) errors.city.blank = "City must start with a letter";
        if(state.length < 5) errors.state.min = "State min length is 5";
        if(state.length > 50) errors.state.max = "State max length is 50";
        if(!state.trim().length) errors.state.blank = "State must start with a letter";
        if(lat < -90) errors.lat.min = "Latitude min ammount is -90";
        if(lat > 90) errors.lat.max = "Latitude max ammount is 90";
        if(lng < -180) errors.lng.min = "Longitude min ammount is -180";
        if(lng > 180) errors.lng.max = "Longitude max ammount is 180";
        if(name.length < 5) errors.name.min = "Name min length is 5";
        if(name.length > 50) errors.name.max = "Name max length is 50";
        if(!name.trim().length) errors.name.blank = "Name must start with a letter";
        if(description.length < 20) errors.description.min = "Description min length is 5";
        if(description.length > 100) errors.description.max = "Description max length is 100";
        if(!description.trim().length) errors.description.blank = "Description must start with a letter";

        if(price < 1) errors.price.min = "Price min ammount is 0";
        if(price > 2000) errors.price.max = "Longitude max ammount is 2000";

        for (const key in errors)  if(Object.values(errors[key]).length > 0) counter++;
        if(counter > 0) setDistableButton(true);
        else setDistableButton(false);
        setFrontendErrors({ ...errors })
    }, [address, city, state, country, lat, lng, name, description, price]);
    
    useEffect(() => {
        if(edit) dispatch(getSpotDetails(spotId));
    }, [dispatch]);
    return (
        <div id="spot-form-id-d1">
            <form id="spot-form-id-d1f2" onSubmit={(e) => handleSubmit(e)}>
                <div id="spot-form-id-d1f2d31">
                    <div className="spot-form-d1f2d31d4">
                        <FormInput { ...{ text: "Address", value: address, type: "text", setValue: setAddress, inputPlaceholder: "", errors: frontendErrors?.address} }/>
                        <FormInput { ...{ text: "City", value: city, type: "text", setValue: setCity, inputPlaceholder: "", errors: frontendErrors?.city } }/>
                    
                        <FormInput { ...{ text: "State", value: state, type: "text", setValue: setState, inputPlaceholder: "", errors: frontendErrors?.state } }/>
                        <FormSelect { ...{ text: "State", value: country, options: ["Mexico", "Canada", "United States"], setValue: setCountry } }/>
                        <FormInput { ...{ text: "Latitude", value: lat, type: "number", setValue: setLatitude, inputPlaceholder: "", errors: frontendErrors?.lat } }/>
                        <FormInput { ...{ text: "Longitude", value: lng, type: "number", setValue: setLongitude, inputPlaceholder: "", errors: frontendErrors?.lng } }/>
                    </div>
                    <div className="spot-form-d1f2d31d4">
                        <FormInput { ...{ text: "Name", value: name, type: "text", setValue: setName, inputPlaceholder: "", errors: frontendErrors?.name } }/>
                        <FormTextArea { ...{ text: "Description", value: description, setValue: setDescription, inputPlaceholder: "", errors: frontendErrors?.description } }/>
                        <FormInput { ...{ text: "Price", value: price, type: "number", setValue: setPrice, inputPlaceholder: "", errors: frontendErrors?.price } }/>
                    </div>

                </div>
                <div id="spot-form-id-d1f2d32">
                    <button id="spot-form-id-d1f2d32b4" type="submit" className="spot-form-button" disabled={disableButton}>Submit</button>
                </div>
                { (Object.values(backendErrors).length > 0) && <BackendErrors { ...{ backendErrors , setBackendErrors } }/> }
            </form>
        </div>
    );
};

export default SpotForm;