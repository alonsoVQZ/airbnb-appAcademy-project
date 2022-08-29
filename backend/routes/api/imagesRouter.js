const imagesRouter = require('express').Router();
const spotImagesRouter = require('express').Router();
const reviewImagesRouter = require('express').Router();

const { Image } = require('../../db/models');
const { authentication, authorization } = require('../../utils/auth.js');
const { validateImage, checkImageId } = require('../../utils/validation.js')

/*** imagesRouter ***/
// Delete an Image
imagesRouter.delete('/:imageId', checkImageId, authentication, authorization, async (req, res) => {
    const { imageId } = res.locals;
    await Image.deleteImage(imageId);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

/*** spotImagesRouter ***/

// Add an Image to a Spot based on the Spot's id
spotImagesRouter.post('/', validateImage, authentication, authorization, async (req, res) => {
    const { spotId } = res.locals                               ;
    const { url } = req.body;
    const image = await Image.createSpotImage(spotId, url);
    res.json(image);
});


/*** reviewImagesRouter ***/

// Add an Image to a Review based on the Review's id
reviewImagesRouter.post('/', validateImage, authentication, authorization, async (req, res) => {
    const { reviewId } = res.locals;
    const { url } = req.body;
    const image = await Image.createReviewImage(reviewId, url)
    res.json(image);
});

module.exports = { imagesRouter, spotImagesRouter, reviewImagesRouter }