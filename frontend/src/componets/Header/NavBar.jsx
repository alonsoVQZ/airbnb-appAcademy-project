import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/NavBar.css";
import Modal from "../misc/Modal";
import { signOut, demouser } from "../../store/account";
import { useHistory } from "react-router-dom";
import SignForms from "./SignForms";
import { useClickCloseElement } from "../misc/helperFunctions"
import { UserContext } from "../../context/UserContext";
import SpotForm from "../Main/SpotForm";

function NavBar() {
    const user = useSelector(state => state.user);
    const [navBarContent, setNavBarContent] = useState();
    useEffect(() => {
        if(user) setNavBarContent(<UserIn />);
        else setNavBarContent(<UserOut />)
    }, [user]);

    return (
        <nav id="nav-bar-container">
            { 
                user && <span id="nav-bar-user">{`${user.firstName} ${user.lastName}`}</span>
            }
            { 
                navBarContent
            }
        </nav>
    );
}

function UserIn() {
    const { setUser } = useContext(UserContext);
    const [userDropdown, setUserDropdown] = useState(false);
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const disptach = useDispatch();
    const history = useHistory();
    const handleSpots = () => history.push("/user/spots");
    const handleReviews = () => history.push("/user/reviews");
    const handleBookings = () => history.push("/user/bookings");
    const handleSignOut = () => {
        disptach(signOut());
        setUser(null);
        history.push("/");
    }
    const handleHost = () => {
        setModal(true)
    }
    return (
        <ul id="nav-bar-list">
            <li id="nav-bar-list-user" className="nav-bar-list-element" key="nav-bar-list-user">
                <img className="nav-bar-list-icon" src="/user-icon.png" alt="" onClick={() => setUserDropdown(!userDropdown)}/>
                {
                    userDropdown && (
                        <Dropdown>
                            <DropdownElement {...{text: "Spots", imgSrc: "/user-icon.png", func: handleSpots}}/>
                            <DropdownElement {...{text: "Reviews", imgSrc: "/user-icon.png", func: handleReviews}}/>
                            <DropdownElement {...{text: "Bookings", imgSrc: "/user-icon.png", func: handleBookings}}/>
                        </Dropdown>
                    )
                }
            </li>
            <li id="nav-bar-list-menu" className="nav-bar-list-element" key="nav-bar-list-menu">
                <img className="nav-bar-list-icon" src="/menu-icon.png" alt="" onClick={() => setMenuDropdown(!menuDropdown)}/>
                {
                    menuDropdown && (
                        <Dropdown>
                            <DropdownElement {...{text: "Become a Host", imgSrc: "/user-icon.png", func: handleHost}}/>
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

function UserOut() {
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
        <ul id="nav-bar-list">
            <li id="nav-bar-list-menu" className="nav-bar-list-element" key="nav-bar-list-menu">
                <img className="nav-bar-list-icon" src="/menu-icon.png" alt="" onClick={() => setMenuDropdown(!menuDropdown)}/>
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
        <div id="dropdown-container">
            {children}
        </div>
    )
}

function DropdownElement(props) {
    const { text, imgSrc, func, setModal, setFormsPosition} = props;
    return (
        <div className="dropdown-list-element" onClick={(e) => func(setModal, setFormsPosition)}>
            <img className="dropdown-list-icon" src={imgSrc} alt={text}/>
            <span className="dropdown-list-span">{text}</span>
        </div>
    );
}


export default NavBar;