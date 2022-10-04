import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Reducer
import { signIn, signUp } from "../../store/account";

// Style
import "./style/SignForms.css"

function SignForms({ formsPosition }) {
    const [signLeftComponent, setSignLeftComponent] = useState();
    const [signRightComponent, setSignRightComponent] = useState();
    const stateObject = { setSignLeftComponent, setSignRightComponent };
    useEffect(() => {
        if(formsPosition) {
            setSignLeftComponent(<SignInForm />)
            setSignRightComponent(<SignUpOverlay  {...stateObject}/>)
        } else {
            setSignLeftComponent(<SignInOverlay {...stateObject} />)
            setSignRightComponent(<SignUpForm />)
        }
    }, []);

    return (
        <div id="sign-forms-container">
            {signLeftComponent}
            {signRightComponent}
        </div>
    );
}

function SignInForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmitSignIn(e) {
        e.preventDefault();
        const user = { credential, password };
        dispatch(signIn(user));
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

function SignUpForm() {
    const dispatch = useDispatch();
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmitSignUp(e) {
        e.preventDefault();
        const user = { firstName, lastName, username, email, password }
        dispatch(signUp(user));
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

function SignInOverlay(stateObject) {
    const { setSignLeftComponent, setSignRightComponent } = stateObject;
    function handleSignInOverlayButton(e) {
        setSignLeftComponent(<SignInForm />)
        setSignRightComponent(<SignUpOverlay {...stateObject} />)
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

function SignUpOverlay(stateObject) {
    const { setSignLeftComponent, setSignRightComponent } = stateObject;
    function handleSignUpOverlayButton(e) {
        setSignLeftComponent(<SignInOverlay {...stateObject}/>)
        setSignRightComponent(<SignUpForm />)
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
    console.log(errors)
    return (
        <ul id="errors-container">
            {
                errors.map(element => {
                    
                    return <li><span>{element}</span></li>
                })
            }
        </ul>
    );
}

export default SignForms;