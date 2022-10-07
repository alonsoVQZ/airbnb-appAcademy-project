import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from 'react-router-dom';

import { getUserReviews } from "../../../store/user";
import Modal from "../../misc/Modal";
import ReviewDetails from "../ReviewDetails";

import "./style/Reviews.css"

function Reviews() {
    const reviews = useSelector(state => state.userInfo.reviews);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserReviews())
    }, []);
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
    const { review, User, createdAt } = props.review;
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
                <img src="" alt="" />
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
                </div>
            </div>
            { modal && <Modal { ...{ setModal, outside: true } }><ReviewDetails { ...{ reviewInfo: props.review } }/></Modal> }
        </div>
    );
}

export default Reviews;