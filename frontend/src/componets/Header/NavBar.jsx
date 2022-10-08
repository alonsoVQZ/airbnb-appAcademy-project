import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/NavBar.css";
import Modal from "../misc/Modal";
import { signOut, demouser } from "../../store/account";
import { useHistory } from "react-router-dom";
import SignForms from "./SignForms";
import { UserContext } from "../../context/UserContext";
import SpotForm from "../Main/SpotForm";

function NavBar() {
    const user = useSelector(state => state.user);
    const { authenticated, session } = user;
    const [content, setContent] = useState();
    useEffect(() => {
        if(authenticated) setContent(<UserAuthenticated />);
        else setContent(<UserNoAuthenticated />)
    }, [authenticated]);
    return (
        <nav id="nav-bar-id-nav1">
            { authenticated && <span id="nav-bar-id-nav1s2">{`${session.firstName} ${session.lastName}`}</span> }
            { content }
        </nav>
    );
};

function UserAuthenticated() {
    const { setUser } = useContext(UserContext);
    const [userDropdown, setUserDropdown] = useState(false);
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const disptach = useDispatch();
    const history = useHistory();
    const handleSpots = () => history.push("/user");
    const handleReviews = () => history.push("/user");
    const handleBookings = () => history.push("/user");
    const handleSignOut = () => {
        disptach(signOut());
        setUser(null);
        history.push("/");
    }
    const handleHost = () => {
        setModal(true)
    }
    return (
        <ul id="user-id-ul1">
            <li id="user-id-ul1li21" className="user-ul1li2A">
                <img className="user-ul1li2Ai3" src="/user-icon.png" alt="" onClick={() => setUserDropdown(!userDropdown)}/>
                {
                    userDropdown && (
                        <Dropdown>
                            <DropdownElement {...{text: "Spots", imgSrc: "/user-icon.png", func: handleSpots}}/>
                            <DropdownElement {...{text: "Reviews", imgSrc: "/user-icon.png", func: handleReviews}}/>
                            <DropdownElement {...{text: "Bookings", imgSrc: "/user-icon.png", func: handleBookings}}/>
                            <DropdownElement {...{text: "Become a Host", imgSrc: "/user-icon.png", func: handleHost}}/>
                        </Dropdown>
                    )
                }
            </li>
            <li id="user-id-ul1li22" className="user-ul1li2A">
                <img className="user-ul1li2Ai3" src="/menu-icon.png" alt="" onClick={() => setMenuDropdown(!menuDropdown)}/>
                {
                    menuDropdown && (
                        <Dropdown>
                            <DropdownElement {...{text: "Sign Out", imgSrc: "/user-icon.png", func: handleSignOut}}/>
                        </Dropdown>
                    )
                }
            </li>
            {
                modal && <Modal {...{setModal, outside: true}}><SpotForm {...{formType: "Add", setModal}}/></Modal>
            }
        </ul>
    );
}

function UserNoAuthenticated() {
    const { setUser } = useContext(UserContext);
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [formsPosition, setFormsPosition] = useState(false);
    const userSelector = useSelector(state => state.user);
    const disptach = useDispatch();
    const handleSignIn = (setModal) => {
        setMenuDropdown(false);
        setFormsPosition(true);
        setModal(true);
    }
    const handleSignUp = (setModal) => {
        setMenuDropdown(false);
        setFormsPosition(false);
        setModal(true);
    }
    const handleDemoUser = () => {
        disptach(demouser());
        setUser(userSelector);
    }
    return (
        <ul id="user-id-ul1">
            <li id="user-id-ul1li2" className="user-ul1li2">
                <img className="user-ul1li2i3" src="/menu-icon.png" alt="" onClick={() => setMenuDropdown(!menuDropdown)}/>
                {
                    menuDropdown && (
                        <Dropdown>
                            <DropdownElement {...{text: "Sign In", imgSrc: "/sign-in-icon.png", func: handleSignIn, setModal, setFormsPosition}}/>
                            <DropdownElement {...{text: "Sign Up", imgSrc: "/sign-up-icon.png", func: handleSignUp, setModal, setFormsPosition}}/>
                            <DropdownElement {...{text: "Demo User", imgSrc: "/demo-user-icon.png", func: handleDemoUser}}/>
                        </Dropdown>
                    )
                }
            </li>
            {
                modal && <Modal {...{setModal, outside: true}}><SignForms {...{formsPosition}}/></Modal>
            }
        </ul>
    );
}

function Dropdown(props) {
    const { children } = props;
    return (
        <div id="dropdown-id-d1">
            {children}
        </div>
    )
}

function DropdownElement(props) {
    const { text, imgSrc, func, setModal, setFormsPosition} = props;
    return (
        <div className="dropdown-element-d1" onClick={(e) => func(setModal, setFormsPosition)}>
            <img className="dropdown-element-d1i2" src={imgSrc} alt={text}/>
            <span className="dropdown-element-d1s2">{text}</span>
        </div>
    );
}


export default NavBar;