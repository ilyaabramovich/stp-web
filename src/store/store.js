import Vue from 'vue'
import Vuex from 'vuex'
import DbService from '@/services/DbService'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { notification },
  state: {
    chapters: [],
    sections: [],
    paragraphs: [],
    units: [],
    questions: [],
    difficulties: ['Уровень 1', 'Уровень 2', 'Уровень 3']
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
    createChapter({ commit, dispatch }, chapter) {
      return DbService.addChapter(chapter)
        .then(() => {
          commit('ADD_CHAPTER', chapter)
          const notification = {
            type: 'success',
            message: `Глава успешно создана`
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при создании chapter: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchChapters({ commit, dispatch }) {
      DbService.getChapters()
        .then(res => {
          commit('SET_CHAPTERS', res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при получении глав: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    createSection({ commit, dispatch }, section) {
      return DbService.addSection(section)
        .then(() => {
          commit('ADD_SECTION', section)
          const notification = {
            type: 'success',
            message: `Раздел успешно создан`
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при создании раздела: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchSections({ commit, dispatch }, chapterId) {
      DbService.getSections(chapterId)
        .then(res => {
          commit('SET_SECTIONS', res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при получении разделов: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    createParagraph({ commit, dispatch }, paragraph) {
      return DbService.addParagraph(paragraph)
        .then(() => {
          commit('ADD_PARAGRAPH', paragraph)
          const notification = {
            type: 'success',
            message: `Параграф успешно создан`
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при создании параграфа: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchParagraphs({ commit, dispatch }, sectionId) {
      DbService.getParagraphs(sectionId)
        .then(res => {
          commit('SET_PARAGRAPHS', res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при получении параграфов: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    createUnit({ commit, dispatch }, unit) {
      return DbService.addUnit(unit)
        .then(() => {
          commit('ADD_UNIT', unit)
          const notification = {
            type: 'success',
            message: `Задание успешно создано`
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при создании задания: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchUnits({ commit, dispatch }, paragraphId) {
      DbService.getUnits(paragraphId)
        .then(res => {
          commit('SET_UNITS', res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при получении глав: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    createQuestion({ commit, dispatch }, question) {
      return DbService.addQuestion(question)
        .then(() => {
          commit('ADD_QUESTION', question)
          const notification = {
            type: 'success',
            message: `Вопрос успешно создан`
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при создании вопроса: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchTests({ dispatch }) {
      DbService.getTests()
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `Ошибка при получении теста: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
})
