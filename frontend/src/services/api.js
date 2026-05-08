import { generateRoadmapPreview } from "./roadmapService";

export const generateRoadmap = async (data) => {
  const skill = data?.skill || "";
  const roadmap = await generateRoadmapPreview(skill);

  return {
    data: {
      roadmap,
    },
  };
};
