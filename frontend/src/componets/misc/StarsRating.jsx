import "./style/StarsRating.css"

export function ShowStarsRating(props) {
    const { avgRating = 0, avgStarRating = 0, stars = 0, numReviews, details = false } = props;
    return (
        <div className="show-star-rating-d1">
            <img className="show-star-rating-d1i2" src="/icons/black-star.png" alt="" />
            <span className="show-star-rating-d1s2">{avgRating || avgStarRating || stars }</span>
            {
                details && (
                    <>
                        <span className="show-star-rating-d1s2">·</span>
                        <span className="show-star-rating-d1s2">{`${numReviews} reviews`}</span>
                    </>
                )
            }
        </div>
    );
}

export function SetStarsRating() {
    return (
        <div>

        </div>
    );
}
