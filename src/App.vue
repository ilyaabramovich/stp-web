<template>
  <div id="app">
    <Header :title="title"/>
    <Form
      :subsections="subsections"
      :paragraphs="paragraphs"
      :chapters="chapters"
      :sections="sections"
      :difficulties="difficulties"
      :selected-chapter="selectedChapter"
      :selected-section="selectedSection"
      :selected-paragraph="selectedParagraph"
      :selected-subsection="selectedSubsection"
      :selected-difficulty="selectedDifficulty"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";

export default {
  name: "app",
  data() {
    return {
      title: "Добавление вопроса",
      selectedChapter: "",
      selectedSection: "",
      selectedParagraph: "",
      selectedSubsection: "",
      selectedDifficulty: "",
      chapters: [
        { value: 1, title: "Глава 1" },
        { value: 2, title: "Глава 2" },
        { value: 3, title: "Глава 3" }
      ],
      sections: [
        { value: 1, title: "Раздел 1" },
        { value: 2, title: "Раздел 2" },
        { value: 3, title: "Раздел 3" }
      ],
      subsections: [
        { value: 1, title: "Тип 1" },
        { value: 2, title: "Тип 2" },
        { value: 3, title: "Тип 3" }
      ],
      paragraphs: [
        { value: 1, title: "Параграф 1" },
        { value: 2, title: "Параграф 2" },
        { value: 3, title: "Параграф 3" }
      ],
      difficulties: [
        { value: 1, title: "Уровень 1" },
        { value: 2, title: "Уровень 2" },
        { value: 3, title: "Уровень 3" }
      ],
      questionTypes: [
        { id: 1, type: "Один вариант ответа" },
        { id: 2, type: "Несколько вариантов" },
        { id: 3, type: "Открытый ответ" }
      ]
    };
  },
  components: {
    Form,
    Header
  }
};
</script>

<style>
</style>
