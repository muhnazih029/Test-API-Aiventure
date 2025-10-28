const express = require('express');
const {
  getPlaceRatingsService,
  createPlaceRatingService,
  getRatingsWithPaginationService,
  updatePlaceRatingService,
  deletePlaceRatingService,
} = require('./rating.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();
// router.use(userAuthMiddleware);

router.get('/place/:placeId', async (req, res) => {
  const { placeId } = req.params;
  try {
    const { page, limit } = req.query;
    if (page || limit) {
      const paginatedRatings = await getRatingsWithPaginationService(
        placeId,
        page,
        limit
      );
      return res.status(200).json(paginatedRatings);
    }
    const ratings = await getPlaceRatingsService(parseInt(placeId));
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/place/:placeId', userAuthMiddleware, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const userId = req.user.id;
    const { placeId } = req.params;

    if (rating === undefined) {
      return res.status(400).json({ message: 'Rating value is required.' });
    }

    const newRating = await createPlaceRatingService({
      userId,
      placeId: parseInt(placeId),
      rating,
      review,
    });
    res
      .status(201)
      .json({ message: 'Rating created successfully', rating: newRating });
  } catch (error) {
    // console.error('[CONTROLLER] Error caught:', error);

    if (error.message === 'You have already rated this place.') {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

router.patch('/place/:placeId', userAuthMiddleware, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const userId = req.user.id;
    const { placeId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: 'Cannot update rating. Data is empty.' });
    }

    const updatedRating = await updatePlaceRatingService({
      userId,
      placeId: parseInt(placeId),
      rating,
      review,
    });
    res.json({ message: 'Rating updated successfully', rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/place/:placeId', userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;
    const result = await deletePlaceRatingService(userId, parseInt(placeId));
    res.json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
