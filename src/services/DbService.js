import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api/`
});

export default {
  getChapters() {
    return apiClient.get("/chapters");
  },
  generateJSON() {
    return apiClient.get("/questions");
  },
  getSections(value) {
    return apiClient.get(`/sections/?chapterId=${value}`);
  },
  getParagraphs(value) {
    return apiClient.get(`/paragraphs/?sectionId=${value}`);
  },
  getUnits(value) {
    return apiClient.get(`/units/?paragraphId=${value}`);
  },
  addQuestion(data) {
    return apiClient.post("/questions", { data });
  },
  addChapter(data) {
    return apiClient.post("/chapters", { data });
  },
  addParagraph(data) {
    return apiClient.post("/paragraphs", { data });
  },
  addSection(data) {
    return apiClient.post("/sections", { data });
  },
  addUnit(data) {
    return apiClient.post("/units", { data });
  }
};
