<template>
  <div id="app">
    <TheHeading>Добавление вопроса</TheHeading>
    <QuestionForm
      @json-generated="generateJSON"
      @question-added="addQuestion"
      @chapter-added="addChapter"
      @section-added="addSection"
      @paragraph-added="addParagraph"
      @unit-added="addUnit"
    />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading.vue'
import QuestionForm from './components/QuestionForm.vue'
import DbService from './services/DbService'

export default {
  name: 'app',
  components: {
    QuestionForm,
    TheHeading
  },
  methods: {
    generateJSON() {
      DbService.generateJSON()
        .then(res => {
          alert('JSON сгенерирован!')
          // eslint-disable-next-line
          console.log(res.data)
        }) // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    addChapter(chapter) {
      DbService.addChapter(chapter)
        .then(() => {
          alert('Глава добавлена!')
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    addSection(section) {
      DbService.addSection(section)
        .then(() => {
          alert('Раздел добавлен!')
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    addParagraph(paragraph) {
      DbService.addParagraph(paragraph)
        .then(() => {
          alert('Параграф добавлен!')
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    addUnit(unit) {
      DbService.addUnit(unit)
        .then(() => {
          alert('Задание добавлено!')
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error))
    },
    addQuestion(question) {
      DbService.addQuestion(question)
        .then(() => {
          alert('Вопрос добавлен!')
          // eslint-disable-next-line
        })
        // eslint-disable-next-line
        .catch(error => console.error(error))
    }
  }
}
</script>

<style></style>
