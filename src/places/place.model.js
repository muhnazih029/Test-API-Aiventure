const prisma = require('../db');

const createPlace = async (data) => {
  return await prisma.places.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      city: data.city,
      rating_average: data.rating_average,
      image_url: data.image_url,
    },
  });
};

const getPlaceById = async (id) => {
  return await prisma.places.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

const updatePlace = async (id, data) => {
  return await prisma.places.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      city: data.city,
      rating_average: data.rating_average,
      image_url: data.image_url,
    },
  });
};

const deletePlace = async (id) => {
  return await prisma.places.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const getAllPlaces = async () => {
  return await prisma.places.findMany();
};

const getPlacesWithPagination = async (page, limit) => {
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * pageSize;

  const places = await prisma.places.findMany({
    skip: skip,
    take: pageSize,
  });

  const totalPlaces = await prisma.places.count();

  return { places, total: totalPlaces, page: pageNumber, limit: pageSize };
};

module.exports = {
  createPlace,
  getPlaceById,
  updatePlace,
  deletePlace,
  getAllPlaces,
  getPlacesWithPagination,
};
