<template>
  <div id="app">
    <TheHeading :title="title"/>
    <QuestionForm
      :refetch-chapters="fetchChapters"
      :units="units"
      :paragraphs="paragraphs"
      :chapters="chapters"
      :sections="sections"
      :difficulties="difficulties"
      :type-answers="typeAnswers"
      :on-chapter-change="onChapterChange"
      :on-section-change="onSectionChange"
      :on-paragraph-change="onParagraphChange"
      :on-generate-click="generateJSON"
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
import * as api from "./services/DbService";

export default {
  name: "app",
  components: {
    QuestionForm,
    TheHeading
  },
  data() {
    return {
      title: "Добавление вопроса",
      chapters: [],
      sections: [],
      paragraphs: [],
      units: [],
      difficulties: [
        { id: 1, name: "Уровень 1" },
        { id: 2, name: "Уровень 2" },
        { id: 3, name: "Уровень 3" }
      ],
      typeAnswers: [
        { id: "one", name: "Один вариант ответа" },
        { id: "many", name: "Несколько вариантов" },
        { id: "open", name: "Открытый ответ" }
      ]
    };
  },
  created() {
    this.fetchChapters();
  },
  methods: {
    addChapter(name) {
      api
        .addChapter({
          name
        })
        .then(() => {
          alert("Глава добавлена!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addSection(name, chapterId) {
      api
        .addSection({
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
      api
        .addParagraph({
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
      api
        .addUnit({
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
      api
        .addQuestion({
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
    },
    generateJSON() {
      api
        .generateJSON()
        .then(res => {
          alert("JSON сгенерирован!");
          // eslint-disable-next-line
          console.log(res.data);
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    onChapterChange(chapterId) {
      this.fetchSections(chapterId);
    },
    onSectionChange(sectionId) {
      this.fetchParagraphs(sectionId);
    },
    onParagraphChange(paragraphId) {
      this.fetchUnits(paragraphId);
    },
    fetchChapters() {
      api
        .getChapters()
        .then(res => (this.chapters = res.data))
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    fetchSections(chapterId) {
      api
        .getSections(chapterId)
        .then(res => (this.sections = res.data))
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    fetchParagraphs(sectionId) {
      api
        .getParagraphs(sectionId)
        .then(res => (this.paragraphs = res.data))
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    fetchUnits(paragraphId) {
      api
        .getUnits(paragraphId)
        .then(res => (this.units = res.data))
        // eslint-disable-next-line
        .catch(error => console.error(error));
    }
  }
};
</script>

<style>
</style>
