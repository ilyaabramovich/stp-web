<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <form>
          <select-container title="Глава" hasAddon>
            <select @change="onChapterChange(chapter)" v-model="chapter">
              <option disabled value>Выберите главу</option>
              <option
                :key="chapter.id"
                v-for="chapter in chapters"
                :value="chapter.id"
              >{{ chapter.name }}</option>
            </select>
          </select-container>
          <select-container title="Раздел" hasAddon>
            <select @change="onSectionChange(section)" v-model="section">
              <option disabled value>Выберите раздел</option>
              <option
                :key="section.id"
                v-for="section in sections"
                :value="section.id"
              >{{ section.name }}</option>
            </select>
          </select-container>
          <select-container title="Параграф" hasAddon>
            <select @change="onParagraphChange(paragraph)" v-model="paragraph">
              <option disabled value>Выберите параграф</option>
              <option
                :key="paragraph.id"
                v-for="paragraph in paragraphs"
                :value="paragraph.id"
              >{{ paragraph.name }}</option>
            </select>
          </select-container>
          <select-container title="Задания" hasAddon>
            <select v-model="unit">
              <option disabled value>Выберите задание</option>
              <option
                :key="unit.id"
                v-for="unit in units"
                :value="unit.id"
              >{{ unit.name }} ({{unit.hint}})</option>
            </select>
          </select-container>
          <div class="columns">
            <div class="column is-three-quarters">
              <select-container title="Тип вопроса" hasAddon>
                <select v-model="questionType">
                  <option disabled value>Выберите тип</option>
                  <option
                    :key="questionType.id"
                    v-for="questionType in questionTypes"
                    :value="questionType.id"
                  >{{ questionType.name }}</option>
                </select>
              </select-container>
            </div>
            <div class="column">
              <select-container title="Сложность" :hasAddon="false">
                <select v-model="difficulty">
                  <option disabled value>Выберите сложность</option>
                  <option
                    :key="difficulty.id"
                    v-for="difficulty in difficulties"
                    :value="difficulty.id"
                  >{{ difficulty.name }}</option>
                </select>
              </select-container>
            </div>
          </div>
          <textarea-container title="Вопрос">
            <textarea
              v-model="question"
              placeholder="Введите текст вопроса"
              class="textarea"
              cols="30"
              rows="5"
            ></textarea>
          </textarea-container>
          <div class="field">
            <div class="control">
              <Button variant="primary">Добавить вопрос</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import SelectContainer from "./SelectContainer.vue";
import Button from "./Button.vue";
import TextareaContainer from "./TextareaContainer.vue";

export default {
  name: "Form",
  methods: {
    show() {
      this.$modal.show("section-modal");
    },
    hide() {
      this.$modal.hide("section-modal");
    }
  },
  props: {
    questionTypes: Array,
    chapters: Array,
    sections: Array,
    units: Array,
    paragraphs: Array,
    difficulties: Array,
    onChapterChange: Function,
    onSectionChange: Function,
    onParagraphChange: Function
  },
  data() {
    return {
      chapter: "",
      section: "",
      paragraph: "",
      unit: "",
      question: "",
      difficulty: "",
      questionType: ""
    };
  },
  components: {
    SelectContainer,
    TextareaContainer,
    Button
  }
};
</script>
