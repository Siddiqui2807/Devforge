import api from "../api/axios";

export const getProjectRecommendations = async (skills) => {
  const response = await api.post("/recommend/", { skills });
  return response.data;
};
