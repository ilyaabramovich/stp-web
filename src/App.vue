<template>
  <div id="app">
    <Header :title="title"/>
    <Form
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
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import * as api from "./services/DbService";

export default {
  name: "app",
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
  created: function() {
    return this.fetchChapters();
  },
  methods: {
    onChapterChange: async function(chapterId) {
      await this.fetchSections(chapterId);
    },
    onSectionChange: async function(sectionId) {
      await this.fetchParagraphs(sectionId);
    },
    onParagraphChange: async function(paragraphId) {
      await this.fetchUnits(paragraphId);
    },
    fetchChapters: function() {
      return (
        api
          .getChapters()
          .then(res => (this.chapters = res.data))
          // eslint-disable-next-line
          .catch(error => console.error(error))
      );
    },
    fetchSections: function(chapterId) {
      return (
        api
          .getSections(chapterId)
          .then(res => (this.sections = res.data))
          // eslint-disable-next-line
          .catch(error => console.error(error))
      );
    },
    fetchParagraphs: function(sectionId) {
      return (
        api
          .getParagraphs(sectionId)
          .then(res => (this.paragraphs = res.data))
          // eslint-disable-next-line
          .catch(error => console.error(error))
      );
    },
    fetchUnits: function(paragraphId) {
      return (
        api
          .getUnits(paragraphId)
          .then(res => (this.units = res.data))
          // eslint-disable-next-line
          .catch(error => console.error(error))
      );
    }
  },
  components: {
    Form,
    Header
  }
};
</script>

<style>
</style>
