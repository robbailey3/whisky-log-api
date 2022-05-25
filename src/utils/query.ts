import { BadRequestException } from '@nestjs/common';

const createGeoQuery = (
  fieldName: string,
  latitude: number,
  longitude: number,
  distance: number
) => {
  if (
    latitude === undefined ||
    longitude === undefined ||
    distance === undefined
  ) {
    throw new BadRequestException('Invalid query');
  }
  return {
    [fieldName]: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: distance
      }
    }
  };
};

export { createGeoQuery };
