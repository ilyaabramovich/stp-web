<template>
  <div id="app">
    <TheHeading>Добавление вопроса</TheHeading>
    <QuestionForm
      :on-chapter-add="addChapter"
      :on-question-add="addQuestion"
      :on-section-add="addSection"
      :on-paragraph-add="addParagraph"
      :on-unit-add="addUnit"
    />
  </div>
</template>

<script>
import TheHeading from "./components/TheHeading.vue";
import QuestionForm from "./components/QuestionForm.vue";
import DbService from "./services/DbService";

export default {
  name: "app",
  components: {
    QuestionForm,
    TheHeading
  },
  data() {
    return {};
  },
  methods: {
    addChapter(name) {
      DbService.addChapter({
        name
      })
        .then(() => {
          alert("Глава добавлена!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addSection(name, chapterId) {
      DbService.addSection({
        name,
        chapterId
      })
        .then(() => {
          alert("Раздел добавлен!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addParagraph(name, sectionId) {
      DbService.addParagraph({
        name,
        sectionId
      })
        .then(() => {
          alert("Параграф добавлен!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addUnit(name, difficulty, paragraphId, hint) {
      DbService.addUnit({
        name,
        difficulty,
        paragraphId,
        hint
      })
        .then(() => {
          alert("Задание добавлено!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addQuestion(unitId, name, hint, typeAnswer, answer) {
      DbService.addQuestion({
        unitId,
        name,
        hint,
        typeAnswer,
        answer
      })
        .then(() => {
          alert("Вопрос добавлен!");
          // eslint-disable-next-line
        })
        // eslint-disable-next-line
        .catch(error => console.error(error));
    }
  }
};
</script>

<style>
</style>
