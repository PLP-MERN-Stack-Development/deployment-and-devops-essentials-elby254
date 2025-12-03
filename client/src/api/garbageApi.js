import axios from "axios";

export const submitGarbageRequest = async (data) => {
  return await axios.post("/api/garbage", data);
};

export const getUserRequests = async (userId) => {
  return await axios.get(`/api/garbage/${userId}`);
};
