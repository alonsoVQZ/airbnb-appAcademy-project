const imagesRouter = require('express').Router();
const spotImagesRouter = require('express').Router();
const reviewImagesRouter = require('express').Router();



/*** imagesRouter ***/
// Delete an Image
imagesRouter.delete('/', (req, res) => {

});

/*** spotImagesRouter ***/

// Add an Image to a Spot based on the Spot's id
spotImagesRouter.post('/', (req, res) => {

    res.json({ spotImagesRouter: 'spotImagesRouter' })
});


/*** reviewImagesRouter ***/

// Add an Image to a Review based on the Review's id
reviewImagesRouter.post('/', (req, res) => {
    res.json({ reviewImagesRouter: 'reviewImagesRouter' })
});

module.exports = { spotImagesRouter, reviewImagesRouter }