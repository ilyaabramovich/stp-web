import Vue from 'vue'
import Vuex from 'vuex'
import DbService from './services/DbService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chapters: [],
    sections: [],
    paragraphs: [],
    units: [],
    questions: [],
    difficulties: [
      { id: 1, name: 'Уровень 1' },
      { id: 2, name: 'Уровень 2' },
      { id: 3, name: 'Уровень 3' }
    ]
  },
  mutations: {
    ADD_CHAPTER(state, chapter) {
      state.chapters.push(chapter)
    },
    SET_CHAPTERS(state, chapters) {
      state.chapters = chapters
    },
    ADD_SECTION(state, section) {
      state.sections.push(section)
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections
    },
    ADD_PARAGRAPH(state, paragraph) {
      state.paragraphs.push(paragraph)
    },
    SET_PARAGRAPHS(state, paragraphs) {
      state.paragraphs = paragraphs
    },
    ADD_UNIT(state, unit) {
      state.units.push(unit)
    },
    SET_UNITS(state, units) {
      state.units = units
    },
    ADD_QUESTION(state, question) {
      state.questions.push(question)
    }
  },
  actions: {
    createChapter({ commit }, chapter) {
      DbService.addChapter(chapter)
        .then(() => {
          alert('Глава добавлена')
        })
        .catch(error => console.error(error))
      commit('ADD_CHAPTER', chapter)
    },
    fetchChapters({ commit }) {
      DbService.getChapters()
        .then(res => {
          commit('SET_CHAPTERS', res.data)
        })
        .catch(error => console.error(error))
    },
    createSection({ commit }, section) {
      DbService.addSection(section)
        .then(() => {
          alert('Раздел добавлен')
        })
        .catch(error => console.error(error))
      commit('ADD_SECTION', section)
    },
    fetchSections({ commit }, chapterId) {
      DbService.getSections(chapterId)
        .then(res => {
          commit('SET_SECTIONS', res.data)
        })
        .catch(error => console.error(error))
    },
    createParagraph({ commit }, paragraph) {
      DbService.addParagraph(paragraph)
        .then(() => {
          alert('Параграф добавлен')
        })
        .catch(error => console.error(error))
      commit('ADD_PARAGRAPH', paragraph)
    },
    fetchParagraphs({ commit }, sectionId) {
      DbService.getParagraphs(sectionId)
        .then(res => {
          commit('SET_PARAGRAPHS', res.data)
        })
        .catch(error => console.error(error))
    },
    createUnit({ commit }, unit) {
      DbService.addUnit(unit)
        .then(() => {
          alert('Задание добавлено')
        })
        .catch(error => console.error(error))
      commit('ADD_UNIT', unit)
    },
    fetchUnits({ commit }, paragraphId) {
      DbService.getUnits(paragraphId)
        .then(res => {
          commit('SET_UNITS', res.data)
        })
        .catch(error => console.error(error))
    },
    createQuestion({ commit }, question) {
      DbService.addQuestion(question)
        .then(() => {
          alert('Вопрос добавлен')
        })
        .catch(error => console.error(error))
      commit('ADD_QUESTION', question)
    },
    fetchTests() {
      DbService.getTests()
        .then(res => {
          console.log(res.data)
        })
        .catch(error => console.error(error))
    }
  }
})
