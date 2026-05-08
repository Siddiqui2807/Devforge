import api from "../api/axios";

export const sendChatbotMessage = async (message) => {
  const response = await api.post("/chatbot/", { message });
  return response.data;
};

