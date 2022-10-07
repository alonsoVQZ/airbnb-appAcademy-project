// Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ShowStarsRating from "../misc/ShowStarsRating";
import ImagesSlider from "../misc/ImagesSlider";
import "./style/ReviewDetails.css"

import { getUserProfile } from "../../store/user";

function ReviewDetails({ reviewInfo, user }) {
    const currentUser = useSelector(state => state.userInfo.profile);
    const dispatch = useDispatch();
    const { userId, review, stars, createdAt } = reviewInfo;
    const { firstName, lastName } = reviewInfo.User;
    const { address, city, state, country, name, price } = reviewInfo.Spot;
    const images = reviewInfo.Images;
    const date = new Date(createdAt);
    const reviewParagraph = <p>{review}</p>
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
    const [reviewElement, setReviewElement] = useState(reviewParagraph);
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])
    return (
        <div id="review-details-id-d1">
            <ImagesSlider { ...{ images } }/>
            <div id="review-details-id-d1d2">
                <div id="review-details-id-d1d2d31">
                    <div id="review-details-id-d1d2d31d41">
                        <img id="review-details-id-d1d2d31d41i5" src="/icons/robot.png" alt="" />
                        <ShowStarsRating { ...{ number: stars } }/>
                    </div>
                    <div id="review-details-id-d1d2d31d42">
                        <span>{`${firstName} ${lastName}`}</span>
                        <span>{`${months[date.getMonth() - 1]} / ${date.getFullYear()}`}</span>
                    </div>
                </div>
                <div id="review-details-id-d1d2d32">
                    <div>
                        <span>{name}</span>
                        <span>{price}</span>
                    </div>
                    <div>
                        <p>{`${address}, ${city}, ${state}`}</p>
                        <span>{country}</span>
                    </div>
                </div>
                <div id="review-details-id-d1d2d33">
                    {reviewElement}
                </div>
                <div id="review-details-id-d1d2d34">
                    {
                        (currentUser.id === userId) && <ReviewOwner { ...{ setReviewElement, review } }/>
                    }
                    <button type="button">Spot</button>
                    <button type="button">Exit</button>
                </div>
            </div>
        </div>
    );
}

function ReviewOwner(props) {
    const { setReviewElement, review } = props;
    const handleEdit = () => setReviewElement(<ReviewForm { ...{ setReviewElement, review } }/>)
    const handleDelete = () => console.log("delete")
    return (
        <>
            <button type="button" onClick={() => handleEdit()}>Edit</button>
            <button type="button" onClick={() => handleDelete()}>Delete</button>
        </>
    )
}

function ReviewForm(props) {
    const { setReviewElement, review } = props;
    const [reviewValue, setReviewValue] = useState();
    return (
        <form>
            <input type="text" value={review}/>
        </form>
    )
}

export default ReviewDetails;