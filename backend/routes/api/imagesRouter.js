const imagesRouter = require('express').Router();
const spotImagesRouter = require('express').Router();
const reviewImagesRouter = require('express').Router();

const { Image } = require('../../db/models');
const { authentication, authorization } = require('../../utils/auth.js')

/*** imagesRouter ***/
// Delete an Image
imagesRouter.delete('/', (req, res) => {

});

/*** spotImagesRouter ***/

// Add an Image to a Spot based on the Spot's id
spotImagesRouter.post('/', authentication, authorization, async (req, res) => {
    const { spotId } = res.locals;
    const { url } = req.body;
    const image = await Image.createSpotImage(spotId, url);
    res.json(image);
});


/*** reviewImagesRouter ***/

// Add an Image to a Review based on the Review's id
reviewImagesRouter.post('/', (req, res) => {
    res.json({ reviewImagesRouter: 'reviewImagesRouter' })
});

module.exports = { spotImagesRouter, reviewImagesRouter }