export const getErrorMessage = (error, fallbackMessage = "Something went wrong.") => {
  const responseData = error?.response?.data;

  if (typeof responseData?.detail === "string" && responseData.detail.trim()) {
    return responseData.detail;
  }

  if (typeof responseData?.error === "string" && responseData.error.trim()) {
    return responseData.error;
  }

  if (Array.isArray(responseData?.skill) && responseData.skill.length > 0) {
    return responseData.skill[0];
  }

  if (typeof responseData?.skill === "string" && responseData.skill.trim()) {
    return responseData.skill;
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
};
