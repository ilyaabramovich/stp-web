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
    difficulties: [
      { id: 1, name: 'Уровень 1' },
      { id: 2, name: 'Уровень 2' },
      { id: 3, name: 'Уровень 3' }
    ]
  },
  mutations: {
    SET_CHAPTERS(state, chapters) {
      state.chapters = chapters
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections
    },
    SET_PARAGRAPHS(state, paragraphs) {
      state.paragraphs = paragraphs
    },
    SET_UNITS(state, units) {
      state.units = units
    }
  },
  actions: {
    fetchChapters({ commit }) {
      DbService.getChapters()
        .then(res => {
          commit('SET_CHAPTERS', res.data)
        })
        // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    fetchSections({ commit }, chapterId) {
      DbService.getSections(chapterId)
        .then(res => {
          commit('SET_SECTIONS', res.data)
        })
        // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    fetchParagraphs({ commit }, sectionId) {
      DbService.getParagraphs(sectionId)
        .then(res => {
          commit('SET_PARAGRAPHS', res.data)
        })
        // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    fetchUnits({ commit }, paragraphId) {
      DbService.getUnits(paragraphId)
        .then(res => {
          commit('SET_UNITS', res.data)
        })
        // eslint-disable-next-line
        .catch(error => console.error(error))
    }
  }
})
