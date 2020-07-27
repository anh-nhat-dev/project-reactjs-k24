import { BASE_URL } from "../constants/app";

export const getImageProduct = (imgName) =>
  `${BASE_URL}/assets/uploads/${imgName}`;

export const formatPriceNumber = (numb = 0) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numb);
};
