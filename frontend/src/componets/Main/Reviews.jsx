import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';

import { getUserReviews } from "../../store/user";
import { getReviews, deleteReviews } from "../../store/reviews";

import Modal from "../misc/Modal";
// import ReviewDetails from "./ReviewDetails";
import ReviewForm from "./forms/ReviewForm";

import "./style/Reviews.css"

function Reviews({ user = false, spotId = 1 }) {
    const spotReviews = useSelector(state => state.reviews);
    const userReviews = useSelector(state => state.user.reviews);
    let reviews = user ? userReviews : spotReviews;
    const dispatch = useDispatch();
    useEffect(() => {
        if(user) dispatch(getUserReviews());
        else dispatch(getReviews(spotId));
    }, []);
    useEffect(() => {
        reviews = user ? userReviews : spotReviews;
    }, [reviews]);
    return (
        <div id="reviews-id-d1">
                {
                    reviews.map((review, i) => {
                        return (
                            <div className="reviews-d1d2">
                                <ReviewCard {  ...{ review } }/>
                            </div>
                        )
                    })
                }
        </div>
    );
}

function ReviewCard(props) {
    const { review, User, createdAt, Images } = props.review;
    const [mouseOver, setMouseOver] = useState(false);
    const [styleShadow, setStyleShadow] = useState(null);
    const [modal, setModal] = useState(false)
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
                <img className="review-card-d1d21i3" src={Images[0].url} alt="" />
                <span></span>
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
                    <button type="button" onClick={() => setModal(true)}>More</button>
                    <OwnerOptions { ...{...props}}/>
                </div>
            </div>
            {/* { modal && <Modal { ...{ setModal, outside: true } }><ReviewDetails { ...{ reviewInfo: props.review } }/></Modal> } */}
        </div>
    );
}

function OwnerOptions(props) {
    const { id, spotId, review, stars} = props.review;
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const handleDelete = (e) => dispatch(deleteReviews(id, spotId));
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