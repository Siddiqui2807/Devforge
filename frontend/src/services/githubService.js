import api from "../api/axios";

export const analyzeGithubUser = async (username) => {
  const response = await api.get("/github/analyze/", {
    params: { username },
  });

  return response.data;
};
