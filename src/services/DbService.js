import Api from "./Api";
const api = new Api();

export const getChapters = () => api.get('/chapters');
export const getSections = value => api.get(`/sections/?chapterId=${value}`);
export const getParagraphs = value => api.get(`/paragraphs/?sectionId=${value}`);
export const getUnits = value => api.get(`/units/?paragraphId=${value}`);
 