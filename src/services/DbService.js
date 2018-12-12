import Api from "./Api";
const api = new Api();

export const getChapters = () => api.get("/chapters");
export const generateJSON = () => api.get("/questions");
export const getSections = value => api.get(`/sections/?chapterId=${value}`);
export const getParagraphs = value =>
  api.get(`/paragraphs/?sectionId=${value}`);
export const getUnits = value => api.get(`/units/?paragraphId=${value}`);

export const addQuestion = data => api.post("/questions", { data });
export const addChapter = data => api.post("/chapters", { data });
export const addParagraph = data => api.post("/paragraphs", { data });
export const addSection = data => api.post("/sections", { data });
export const addUnit = data => api.post("/units", { data });
