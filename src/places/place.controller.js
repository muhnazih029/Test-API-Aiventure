const express = require('express');
const {
  createPlaceService,
  getPlaceByIdService,
  updatePlaceService,
  deletePlaceService,
  getAllPlacesService,
  getPlacesWithPaginationService,
} = require('./place.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();
// router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page || limit) {
      const paginatedPlaces = await getPlacesWithPaginationService(page, limit);
      return res.status(200).json(paginatedPlaces);
    }
    const allPlaces = await getAllPlacesService();
    res.status(200).json(allPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await getPlaceByIdService(req.params.id);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', userAuthMiddleware, async (req, res) => {
  try {
    const placeData = req.body;
    if (!placeData || Object.keys(placeData).length === 0) {
      return res.status(400).json({
        message: 'Cannot create place. Request body is empty.',
      });
    }
    const newPlace = await createPlaceService(req.body);
    res.status(201).json({
      message: 'Place created successfully',
      place: newPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', userAuthMiddleware, async (req, res) => {
  try {
    const placeData = req.body;
    if (!placeData || Object.keys(placeData).length === 0) {
      return res.status(400).json({
        message: 'Cannot update place. Request body is empty.',
      });
    }
    const updatedPlace = await updatePlaceService(req.params.id, placeData);
    res.status(200).json({
      message: 'Place updated successfully',
      place: updatedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', userAuthMiddleware, async (req, res) => {
  try {
    await deletePlaceService(req.params.id);
    res.status(200).json({
      message: 'Place deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
