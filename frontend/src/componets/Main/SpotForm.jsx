// // Style
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./style/SpotForm.css";
// import { getSpotDetails, editSpot, addSpot } from "../../store/spot";
// import { useHistory, useParams } from "react-router-dom";

// function SpotForm(props) {
//     const { formType, setModal } = props;
//     const { spotId } = useParams();
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const spotStore = useSelector(state => state.spot);
//     const [backendErrors, setBackendErrors] = useState([]);
//     const [address, setAddress] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [country, setCountry] = useState("");
//     const [lat, setLatitude] = useState(0);
//     const [lng, setLongitude] = useState(0);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState(0);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const spot = { address, city, state, country, lat, lng, name, description, price };
//         if(formType === "Edit") {
//             const response = await dispatch(editSpot(spot, spotId));
//             if(response.statusCode >= 400) {
//                 setBackendErrors(Object.values(response.errors));
//             } else {
//                 setModal(false);
//             }
//         }
//         if(formType === "Add") {
//             const response = await dispatch(addSpot(spot));
//             if(response.statusCode >= 400) {
//                 setBackendErrors(Object.values(response.errors));
//             } else {
//                 history.push(`/spots/${spotId}`);
//                 setModal(false);
//             }
//         }
//     };
//     useEffect(() => {
//         if(formType === "Edit") dispatch(getSpotDetails(spotId));
//     }, []);
//     useEffect(() => {
//         if(formType === "Edit") {
//             setAddress(spotStore.address);
//             setCity(spotStore.city);
//             setState(spotStore.state);
//             setCountry(spotStore.country);
//             setLatitude(spotStore.lat);
//             setLongitude(spotStore.lng);
//             setName(spotStore.name);
//             setDescription(spotStore.description);
//             setPrice(spotStore.price);
//         }
//     }, [spotStore]);

//     return (
//         <div id="spot-form-container">
//             <h1>{`${formType} Spot`}</h1>
//             <form id="spot-form" onSubmit={(e) => handleSubmit(e)}>
//                 <SpotFormInput { ...{ labelValue: "Address", state: address, inputType: "text", setState: setAddress, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "City", state: city, inputType: "text", setState: setCity, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "State", state: state, inputType: "text", setState: setState, inputPlaceholder: "" } }/>
//                 <SpotFormSelect { ...{ labelValue: "State", state: country, options: ["Mexico", "Canada", "United States"], setState: setCountry } }/>
//                 <SpotFormInput { ...{ labelValue: "Latitude", state: lat, inputType: "number", setState: setLatitude, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "Longitude", state: lng, inputType: "number", setState: setLongitude, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "Name", state: name, inputType: "text", setState: setName, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "Description", state: description, inputType: "text", setState: setDescription, inputPlaceholder: "" } }/>
//                 <SpotFormInput { ...{ labelValue: "Price", state: price, inputType: "number", setState: setPrice, inputPlaceholder: "" } }/>
//                 <div id="spot-form-buttons">
//                     <button type="button" className="spot-form-button" onClick={() => setModal(false)}>Cancel</button>
//                     <button type="reset" className="spot-form-button">Reset</button>
//                     <button type="submit" className="spot-form-button">Submit</button>
//                 </div>
//             </form>
//             {
//                 (backendErrors.length > 0) && <BackendErrors { ...{ backendErrors , setBackendErrors} }/>
//             }
//         </div>
//     );
// };

// function SpotFormInput(props) {
//     const { labelValue, inputType, inputPlaceholder, state, setState } = props;
//     const [showError, setShowError] = useState(false);
//     const [error, setError] = useState("");
//     useEffect(() => {
//         if(labelValue === "Address") {
//             if(state.length < 1) setError("Address Required")
//             else setError("")
//         }
//     }, [state]);
//     return (
//         <div className="spot-form-elements">
//             <label className="spot-form-label">{`${labelValue}:`}</label>
//             <input type={inputType} value={state} placeholder={inputPlaceholder} onChange={(e) => setState(e.target.value)} onMouseEnter={() => setShowError(true)} onMouseLeave={() => setShowError(false)}/>
//             {
//                 (showError && (error.length > 0)) && <FrontendError { ...{ error } }/>
//             }
//         </div>
//     )
// }

// function SpotFormSelect(props) {
//     const { labelValue, inputValue, options, setState } = props;
//     return (
//         <div className="spot-form-elements">
//             <label className="spot-form-label">{labelValue}</label>
//             <select value={inputValue} onChange={(e)  => setState(e.target.value)}>
//                 <option defaultValue="" disabled>Select {labelValue}</option>
//                 {
//                     options.map((element, index) => {
//                         return <option value={element} key={element + (index + 1)}>{element}</option>
//                     })
//                 }
//             </select>
//         </div>
//     )
// }

// function BackendErrors(props) {
//     const { backendErrors, setBackendErrors } = props;
//     const handleClose = () => setBackendErrors([])
//     return (
//         <div id="backend-errors-container">
//             <div id="backend-errors-header">
//                 <img id="backend-errors-icon" src="/forbidden-icon.png" alt="forbidden"/>
//                 <span id="backend-errors-title">Backend error(s)</span>
//             </div>
//             <ul id="backend-errors-list">
//                 {
//                     backendErrors.map((element, i) => {
//                         return (
//                             <li className="backend-errors-li">
//                                 <span className="backend-errors" key={element + (i + 1)}>{element}</span>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//             <button id="backend-errors-button" type="button" onClick={() => handleClose()}>Close</button>
//         </div>
//     )
// }

// function FrontendError(props) {
//     const { error } = props;
//     return (
//         <div id="frontend-error-container">
//             {error}
//         </div>
//     )
// }

// export default SpotForm;