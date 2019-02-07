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
