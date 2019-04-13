import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getChapters() {
    return apiClient.get('/chapters')
  },
  getTests() {
    return apiClient.get('/tests')
  },
  getSections(chapterId) {
    return apiClient.get(`/sections?chapterId=${chapterId}`)
  },
  getParagraphs(sectionId) {
    return apiClient.get(`/paragraphs?sectionId=${sectionId}`)
  },
  getUnits(paragraphId) {
    return apiClient.get(`/units?paragraphId=${paragraphId}`)
  },
  addQuestion(question) {
    return apiClient.post('/questions', question)
  },
  addChapter(chapter) {
    return apiClient.post('/chapters', chapter)
  },
  addParagraph(paragraph) {
    return apiClient.post('/paragraphs', paragraph)
  },
  addSection(section) {
    return apiClient.post('/sections', section)
  },
  addUnit(unit) {
    return apiClient.post('/units', unit)
  }
}
