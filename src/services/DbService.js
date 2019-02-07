import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api/`
});

export const getChapters = () => apiClient.get("/chapters");
export const generateJSON = () => apiClient.get("/questions");
export const getSections = value => apiClient.get(`/sections/?chapterId=${value}`);
export const getParagraphs = value => apiClient.get(`/paragraphs/?sectionId=${value}`);
export const getUnits = value => apiClient.get(`/units/?paragraphId=${value}`);
export const addQuestion = data => apiClient.post("/questions", { data });
export const addChapter = data => apiClient.post("/chapters", { data });
export const addParagraph = data => apiClient.post("/paragraphs", { data });
export const addSection = data => apiClient.post("/sections", { data });
export const addUnit = data => apiClient.post("/units", { data });