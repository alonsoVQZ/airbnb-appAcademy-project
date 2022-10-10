import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postReviews, getReviews, editReviews } from "../../../store/reviews";
import "./style/ReviewForm.css"

function ReviewForm({ id, spotId, review: reviewV , stars: starsV, edit, setModal}) {

    const [review, setReview] = useState(reviewV || "");
    const [stars, setStars] = useState(starsV || 0);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        const reviewObject = { review, stars };
        if(edit) {
            setModal(false);
            dispatch(editReviews(id, spotId, reviewObject));
        }
        else dispatch(postReviews(spotId, reviewObject));
        dispatch(getReviews(spotId));
    }

    return (
        <div id="review-form-id-d1">
            <form id="review-form-id-d1f2" onSubmit={(e) => handleSubmit(e)}>
                <textarea id="review-form-id-d1f2ta3" value={review} type="text" placeholder="Review..." onChange={(e) => setReview(e.target.value)}/>
                <input id="review-form-id-d1f2i3" value={stars} type="number" placeholder="Stars..." onChange={(e) => setStars(e.target.value)}/>
                <button id="review-form-id-d1f2b3" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReviewForm;