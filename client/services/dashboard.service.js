import { BACKEND_ROOT_URL } from "../constants";
const API_URL = `${BACKEND_ROOT_URL}/cars`;
import axios from "axios";

export const getAllCars = async () => {
  const res = await axios.get(API_URL + "/get-all-cars");
  return res.data;
};

export const GetCarDetails = async (_id) => {
  const res = await axios.get(
    `${BACKEND_ROOT_URL}/cars/get-car-details/${_id}`
  );
  return res.data;
};

export const getBodyType = async () => {
  const res = await axios.get(API_URL + "/get-car-types");
  return res.data;
};

export const getPopularCars = async () => {
  const res = await axios.get(API_URL + "/get-popular-cars");
  return res.data;
};

export const getCarsPrice = async () => {
  const res = await axios.get(API_URL + "/get-car-price");
  return res.data;
};

export const getSimilarCars = async () => {
  const res = await axios.get(API_URL + "/get-similar-cars");
  return res.data;
};

export const getSpecifics = async () => {
  const res = await axios.get(API_URL + "/get-all-specifics");
  return res.data;
};

export const findSimilarity = async (body) => {
  const res = await axios.post(API_URL + "/find-similarity", body);
  return res.data;
};
