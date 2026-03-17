import api from "../api/axios";

export const toggleProgress = async (stepId) => {
  const response = await api.post("/progress/", {
    step_id: stepId,
  });
  return response.data;
};