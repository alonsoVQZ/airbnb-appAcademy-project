import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import "./style/Reviews.css"

function Reviews() {
    const { spotId }  = useParams();
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, []);
    return (
        <div>
            {
                reviews.map((element, i) => {
                    return <Review { ...{ element } }/>
                })
            }
        </div>
    );
}

function Review({ element }) {
    const { review, User, stars } = element;
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div className="review-d1">
            <div className="review-d1d2">
                <div className="review-d1d2d31">
                    <img className="review-d1d2d31i4" src="/icons/robot.png" alt="robot" />
                    <div className="review-d1d2d31d4">
                        <span className="review-d1d2d31d4s5">{`${User.firstName} ${User.lastName}`}</span>
                        <StarsRating { ...{ stars } }/>
                    </div>
                </div>
                <div className="review-d1d2d32">
                    <img className="review-d1d2d32i4" src="/icons/review-options.png" alt="review-options" />
                    {
                        showOptions && <ReviewOptions />
                    }
                </div>
            </div>
            <p className="review-d1p2">{review}</p>
        </div>
    );
};

function ReviewOptions() {
    const user = useSelector()
    return (
        <div className="review-options-d1">

        </div>
    );
}


function StarsRating(props) {
    const { stars } = props;
    const intNum = Math.floor(stars);
    const decNum = stars % intNum;
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
        if(i <= intNum) starsArray.push(1);
        else if((i - 1 === intNum) && decNum !== 0) starsArray.push(decNum);
        else starsArray.push(0)
    }
    return (
        <div id="stars-rating-container">
            {
                starsArray.map(element => {
                    return (
                        <div className="stars-container">
                            <img className="black-star" src="/icons/black-star.png" alt="black-star" />
                            {
                                element === 1 && <img className="yellow-star" src="/icons/yellow-star.png" alt="yellow-star" />
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Reviews;