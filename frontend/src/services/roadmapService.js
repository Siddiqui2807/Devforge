import api from "../api/axios";

const normalizeRoadmapList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.roadmaps)) {
    return payload.roadmaps;
  }

  return [];
};

export const getRoadmaps = async () => {
  const response = await api.get("/roadmaps/");
  return normalizeRoadmapList(response.data);
};

export const getDashboardRoadmaps = async () => {
  const response = await api.get("/roadmap/");
  return normalizeRoadmapList(response.data);
};

export const generateRoadmap = async (skill) => {
  const response = await api.post("/roadmap/", { skill });
  return response.data;
};

export const generateRoadmapPreview = async (skill) => {
  const roadmap = await generateRoadmap(skill);

  if (Array.isArray(roadmap?.roadmap)) {
    return roadmap.roadmap.map((line) => String(line).trim()).filter(Boolean);
  }

  const content = String(roadmap?.content || "");

  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};
