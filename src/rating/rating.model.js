const prisma = require('../db');

const getPlaceRatings = async (placeId) => {
  return await prisma.placeRating.findMany({
    where: {
      place_id: parseInt(placeId, 10),
    },
  });
};

const getRatingsWithPagination = async (placeId, page, limit) => {
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * pageSize;

  const whereClause = {
    place_id: parseInt(placeId, 10),
  };

  const ratings = await prisma.placeRating.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
  });

  const totalRatings = await prisma.placeRating.count({
    where: whereClause,
  });

  return {
    ratings,
    total: totalRatings,
    page: pageNumber,
    limit: pageSize,
  };
};

const createPlaceRating = async (data, prismaClient = prisma) => {
  const { userId, placeId, rating, review } = data;
  return await prismaClient.placeRating.create({
    data: {
      user_id: userId,
      place_id: parseInt(placeId, 10),
      rating: rating,
      review: review,
    },
  });
};

const updatePlaceRating = async (ratingData, prismaClient = prisma) => {
  const { userId, placeId, rating, review } = ratingData;
  return await prismaClient.placeRating.update({
    where: {
      user_id_place_id: { user_id: userId, place_id: parseInt(placeId, 10) },
    },
    data: {
      rating: rating,
      review: review,
    },
  });
};

const deletePlaceRating = async (userId, placeId, prismaClient = prisma) => {
  return await prismaClient.placeRating.delete({
    where: {
      user_id_place_id: {
        user_id: userId,
        place_id: parseInt(placeId, 10),
      },
    },
  });
};

module.exports = {
  getPlaceRatings,
  getRatingsWithPagination,
  createPlaceRating,
  updatePlaceRating,
  deletePlaceRating,
};
