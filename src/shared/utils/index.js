import { BASE_URL } from "../constants/app";

export const getImageProduct = (imgName) =>
  `${BASE_URL}/assets/uploads/${imgName}`;
