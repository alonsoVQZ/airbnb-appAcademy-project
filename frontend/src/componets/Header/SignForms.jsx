import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BackendErrors } from "../misc/Errors";
// Reducer
import { signIn, signUp } from "../../store/account";

// Style
import "./style/SignForms.css"

function SignForms({ formsPosition }) {
    const [backendErrors, setBackendErrors] = useState({});
    const [signLeftComponent, setSignLeftComponent] = useState();
    const [signRightComponent, setSignRightComponent] = useState();
    const stateObject = { setSignLeftComponent, setSignRightComponent };
    useEffect(() => {
        if(formsPosition) {
            setSignLeftComponent(<SignInForm { ...{ setBackendErrors } }/>)
            setSignRightComponent(<SignUpOverlay { ...{stateObject, setBackendErrors } } />)
        } else {
            setSignLeftComponent(<SignInOverlay { ...{stateObject, setBackendErrors } } />)
            setSignRightComponent(<SignUpForm { ...{ setBackendErrors } }/>)
        }
    }, []);

    return (
        <div id="sign-forms-container">
            {signLeftComponent}
            {signRightComponent}
            { (Object.values(backendErrors).length > 0) && <BackendErrors { ...{ backendErrors , setBackendErrors } }/> }
        </div>
    );
}

function SignInForm({ setBackendErrors }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmitSignIn(e) {
        e.preventDefault();
        const user = { credential, password };
        const response = await dispatch(signIn(user));
        if(response?.statusCode >= 400) setBackendErrors(response);
    }
    return (
        <form className="sign-form" onSubmit={(e) => handleSubmitSignIn(e)}>
            <h1>Welcome Back</h1>
            <input className="sign-form-input"  type="text" placeholder="Credential" onChange={(e) => setCredential(e.target.value)}/>
            <input className="sign-form-input"  type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="sign-form-button">Sign In</button>
        </form>
    );
}

function SignUpForm({ setBackendErrors }) {
    const dispatch = useDispatch();
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmitSignUp(e) {
        e.preventDefault();
        const user = { firstName, lastName, username, email, password }
        const response = await dispatch(signUp(user));
        if(response?.statusCode >= 400) setBackendErrors(response);
        return;
    }
    return (
        <form className="sign-form" onSubmit={(e) => handleSubmitSignUp(e)}>
            <h1>Create Account</h1>
            <input className="sign-form-input" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <input className="sign-form-input" type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <input className="sign-form-input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input className="sign-form-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input className="sign-form-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="sign-form-button">Sign Up</button>
        </form>
    );
}

function SignInOverlay({ stateObject, setBackendErrors }) {
    const { setSignLeftComponent, setSignRightComponent } = stateObject;
    function handleSignInOverlayButton(e) {
        setSignLeftComponent(<SignInForm { ...{ setBackendErrors } }/>)
        setSignRightComponent(<SignUpOverlay {...{ stateObject, setBackendErrors } } />)
    }
    return (
        <div id="sign-in-overlay" className="sign-overlay">
            <h1>Welcome Back</h1>
            <button
            id="sing-in-overlay-button"
            className="sign-overlay-button"
            onClick={(e) => handleSignInOverlayButton(e)}>
                Sign In
            </button>
        </div>
    );
}

function SignUpOverlay({ stateObject, setBackendErrors }) {
    const { setSignLeftComponent, setSignRightComponent } = stateObject;
    function handleSignUpOverlayButton(e) {
        setSignLeftComponent(<SignInOverlay {...{ stateObject, setBackendErrors } }/>)
        setSignRightComponent(<SignUpForm { ...{ setBackendErrors } }/>)
    }
    return (
        <div id="sign-up-overlay" className="sign-overlay">
            <h1>Create Account</h1>
            <button id="sing-up-overlay-button" className="sign-overlay-button" onClick={(e) => handleSignUpOverlayButton(e)}>Sign Up</button>
        </div>
    );
}

function Errors(props) {
    const { errors } = props;
    return (
        <ul id="errors-container">
            {
                errors.map((element, i) => {
                    
                    return <li key={element + (i + 1)} ><span>{element}</span></li>
                })
            }
        </ul>
    );
}

export default SignForms;