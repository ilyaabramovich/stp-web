<template>
  <div class="container">
    <div class="box">
      <form @submit.prevent="onSubmit">
        <question-form-field-select :on-submit="addChapter" title="Глава" hasAddon>
          <select @change="onChapterSelect(chapterId)" v-model.number="chapterId">
            <option disabled value>Выберите главу</option>
            <option
              v-for="chapter in chapters"
              :key="chapter.id"
              :value="chapter.id"
            >{{ chapter.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select :on-submit="addSection" title="Раздел" hasAddon>
          <select
            v-model.number="sectionId"
            :disabled="!chapterId"
            @change="onSectionSelect(sectionId)"
          >
            <option disabled value>Выберите раздел</option>
            <option
              v-for="section in sections"
              :key="section.id"
              :value="section.id"
            >{{ section.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select :on-submit="addParagraph" title="Параграф" hasAddon>
          <select
            v-model.number="paragraphId"
            :disabled="!sectionId"
            @change="onParagraphSelect(paragraphId)"
          >
            <option disabled value>Выберите параграф</option>
            <option
              v-for="paragraph in paragraphs"
              :key="paragraph.id"
              :value="paragraph.id"
            >{{ paragraph.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select :on-submit="addUnit" title="Задание" hasAddon>
          <select :disabled="!paragraphId" v-model.number="unitId">
            <option disabled value>Выберите задание</option>
            <option
              v-for="unit in units"
              :key="unit.id"
              :value="unit.id"
            >{{ unit.name }} ({{unit.hint}}) Сложность: {{unit.difficulty}}</option>
          </select>
        </question-form-field-select>
        <div class="columns">
          <div class="column is-three-quarters">
            <question-form-field-select title="Тип вопроса" :hasAddon="false">
              <select v-model="typeAnswer">
                <option disabled value>Выберите тип</option>
                <option
                  v-for="typeAnswer in typeAnswers"
                  :key="typeAnswer.id"
                  :value="typeAnswer.id"
                >{{ typeAnswer.name }}</option>
              </select>
            </question-form-field-select>
          </div>
          <div class="column">
            <question-form-field-select title="Сложность" :hasAddon="false">
              <select v-model.number="difficulty">
                <option disabled value>Выберите сложность</option>
                <option
                  v-for="difficulty in difficulties"
                  :key="difficulty.id"
                  :value="difficulty.id"
                >{{ difficulty.name }}</option>
              </select>
            </question-form-field-select>
          </div>
        </div>
        <question-form-field title="Вопрос">
          <textarea
            placeholder="Введите текст вопроса"
            class="textarea"
            cols="30"
            rows="5"
            v-model.trim="name"
          ></textarea>
        </question-form-field>
        <question-form-field title="Подсказка">
          <textarea
            placeholder="Введите подсказку к вопросу"
            class="textarea"
            cols="30"
            rows="5"
            v-model.trim="hint"
          ></textarea>
        </question-form-field>
        <div class="field">
          <label class="label">Введите правильный ответ</label>
          <div class="control">
            <input type="text" v-model.trim="answer" class="input">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <input
              class="button is-success"
              :disabled="!(answer&&name&&unitId&&hint)"
              type="submit"
              value="Добавить вопрос"
            >
          </div>
          <div class="control">
            <button
              class="button is-primary"
              type="button"
              @click="onGenerateClick"
            >Сгенерировать JSON</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import QuestionFormFieldSelect from "./QuestionFormFieldSelect.vue";
import QuestionFormField from "./QuestionFormField.vue";
import DbService from "../services/DbService";
import { mapState } from "vuex";

export default {
  name: "Form",
  components: {
    QuestionFormFieldSelect,
    QuestionFormField
  },
  data() {
    return {
      sections: null,
      paragraphs: null,
      units: null,
      chapters: null,
      chapterId: null,
      sectionId: null,
      paragraphId: null,
      hint: null,
      unitId: null,
      name: null,
      difficulty: null,
      typeAnswer: null,
      answer: null
    };
  },
  computed: mapState(["difficulties", "typeAnswers"]),
  created() {
    DbService.getChapters()
      .then(res => {
        this.chapters = res.data;
      })
      // eslint-disable-next-line
      .catch(error => console.error(error));
  },
  methods: {
    onSubmit() {
      const question = {
        unitId: this.unitId,
        name: this.name,
        hint: this.hint,
        typeAnswer: this.typeAnswer,
        answer: this.answer
      };
      this.unitId = null;
      this.name = null;
      this.hint = null;
      this.typeAnswer = null;
      this.answer = null;
      this.$emit("question-added", question);
    },
    addChapter(name) {
      const chapter = { name };
      this.$emit("chapter-added", chapter);
    },
    addSection(name) {
      const section = { name };
      this.$emit("section-added", section);
    },
    addParagraph(name) {
      const paragraph = { name, sectionId: this.sectionId };
      this.$emit("paragraph-added", paragraph);
    },
    addUnit(name, difficulty, hint) {
      const unit = { name, paragraphId: this.paragraphId, difficulty, hint };
      this.$emit("unit-added", unit);
    },
    onChapterSelect(chapterId) {
      DbService.getSections(chapterId)
        .then(res => {
          this.sections = res.data;
        })
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    onSectionSelect(sectionId) {
      DbService.getParagraphs(sectionId)
        .then(res => {
          this.paragraphs = res.data;
        })
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    onParagraphSelect(paragraphId) {
      DbService.getUnits(paragraphId)
        .then(res => {
          this.units = res.data;
        })
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    onGenerateClick() {
      this.$emit("json-generated");
    }
  }
};
</script>
