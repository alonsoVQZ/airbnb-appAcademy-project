import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';

import { getUserReviews } from "../../store/user";
import { getReviews, deleteReviews } from "../../store/reviews";

import Modal from "../misc/Modal";
// import ReviewDetails from "./ReviewDetails";
import ReviewForm from "./forms/ReviewForm";
import { ShowStarsRating } from "../misc/StarsRating"

import "./style/Reviews.css"

function Reviews({ user = false, spotId = 1 }) {
    const spotReviews = useSelector(state => state.reviews);
    const userReviews = useSelector(state => state.user.reviews);
    let reviews = user ? userReviews : spotReviews;
    const dispatch = useDispatch();
    useEffect(() => {
        if(user) dispatch(getUserReviews());
        else dispatch(getReviews(spotId));
    }, [dispatch]);
    useEffect(() => {

    }, [userReviews]);
    return (
        <div id="reviews-id-d1">
                {
                    reviews.map((review, i) => {
                        return (
                            <div className="reviews-d1d2" key={review + (i + 1)}>
                                <ReviewCard {  ...{ isUser: user, review } }/>
                            </div>
                        )
                    })
                }
        </div>
    );
}

function ReviewCard(props) {
    const user = useSelector(state => state.user.session);
    const { review, User, createdAt, Images, spotId, userId, stars } = props.review;
    const [mouseOver, setMouseOver] = useState(false);
    const [styleShadow, setStyleShadow] = useState(null);
    useEffect(() => {
        if(mouseOver) setStyleShadow("rgb(38, 57, 77) 0px 20px 30px -10px");
        else setStyleShadow(null)
    }, [mouseOver]);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date(createdAt);
    return (
        <div className="review-card-d1" style={ { boxShadow: styleShadow } } onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
            <div className="review-card-d1d21">
                <NavLink to={`/spots/${spotId}`}>
                    <img className="review-card-d1d21i3" src={Images[0]?.url} alt="" />
                </NavLink>
                <ShowStarsRating { ...{ stars } } />
            </div>
            <div className="review-card-d1d22">
                <div className="review-card-d1d22d31">
                    <img className="review-card-d1d22d31i4" src="/icons/robot.png" alt="" />
                    <div className="review-card-d1d22d31d4">
                        <span>{`${User.firstName} ${User.lastName}`}</span>
                        <span>{`${months[date.getMonth() - 1]} / ${date.getFullYear()}`}</span>
                    </div>
                </div>
                <div className="review-card-d1d22d32">
                    <p>{review}</p>
                </div>
                <div className="review-card-d1d22d33">
                    { userId === user.id && <OwnerOptions { ...{...props}}/>}
                </div>
            </div>
        </div>
    );
}

function OwnerOptions(props) {
    const user = props.isUser;
    const { id, spotId, review, stars} = props.review;
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const handleDelete = (e) => dispatch(deleteReviews(id, spotId, user));
    const handleEdit = (e) => setModal(true);

    return (
        <>
            <button type="button" onClick={(e) => handleEdit(e)}>Edit</button>
            <button type="button" onClick={(e) => handleDelete(e)}>Delete</button>
            {
                modal && <Modal { ...{ setModal, outside: true } }><ReviewForm { ...{ id, spotId, review, stars, edit: true, setModal } }/></Modal>
            }
        </>
    )
}

export default Reviews;