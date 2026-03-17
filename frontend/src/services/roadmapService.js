import api from "../api/axios";

export const getRoadmaps = async () => {
  const response = await api.get("/roadmaps/");
  return response.data;
};