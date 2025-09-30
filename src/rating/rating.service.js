const prisma = require('../db');
const {
  getPlaceRatings,
  getRatingsWithPagination,
  createPlaceRating,
  updatePlaceRating,
  deletePlaceRating,
} = require('./rating.model');
const { getPlaceById } = require('../places/place.model');

const _updatePlaceRatingAverage = async (placeId, prismaClient = prisma) => {
  const place = await getPlaceById(parseInt(placeId, 10), prismaClient);
  if (!place) {
    throw new Error('Place not found for updating rating average.');
  }

  const ratings = place.ratings;
  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const average = ratings.length > 0 ? totalRating / ratings.length : 0;
  console.log(
    `[SERVICE] Updating place ID ${placeId} average rating to ${average.toFixed(
      2
    )}`
  );
  console.log(
    `[SERVICE] Total ratings: ${ratings.length}, Total score: ${totalRating}`
  );
  console.log(`[SERVICE] ratings array:`, ratings);

  await prismaClient.places.update({
    where: { id: parseInt(placeId, 10) },
    data: { rating_average: parseFloat(average.toFixed(2)) },
  });
};

const getPlaceRatingsService = async (placeId) => {
  try {
    return await getPlaceRatings(placeId);
  } catch (error) {
    throw new Error(`Error fetching place ratings: ${error.message}`);
  }
};

const getRatingsWithPaginationService = async (placeId, page, limit) => {
  try {
    const result = await getRatingsWithPagination(placeId, page, limit);
    return result;
  } catch (error) {
    throw new Error(`Error fetching ratings with pagination: ${error.message}`);
  }
};

const createPlaceRatingService = async (ratingData) => {
  try {
    const newRating = await prisma.$transaction(async (tx) => {
      const createdRating = await createPlaceRating(ratingData, tx);
      await _updatePlaceRatingAverage(createdRating.place_id, tx);
      return createdRating;
    });

    return newRating;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('You have already rated this place.');
    }
    throw new Error(`Error creating rating: ${error.message}`);
  }
};

const updatePlaceRatingService = async (ratingData) => {
  try {
    const updatedRating = await prisma.$transaction(async (tx) => {
      const rating = await updatePlaceRating(ratingData, tx);
      await _updatePlaceRatingAverage(rating.place_id, tx);
      return rating;
    });
    return updatedRating;
  } catch (error) {
    throw new Error(`Error updating rating: ${error.message}`);
  }
};

const deletePlaceRatingService = async (userId, placeId) => {
  try {
    await prisma.$transaction(async (tx) => {
      await deletePlaceRating(userId, placeId, tx);
      await _updatePlaceRatingAverage(parseInt(placeId, 10), tx);
    });

    return { message: 'Rating deleted and average updated.' };
  } catch (error) {
    throw new Error(`Error deleting rating: ${error.message}`);
  }
};

module.exports = {
  getPlaceRatingsService,
  getRatingsWithPaginationService,
  createPlaceRatingService,
  updatePlaceRatingService,
  deletePlaceRatingService,
};
