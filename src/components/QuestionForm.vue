<template>
  <div class="container">
    <div class="box">
      <form @submit.prevent="onSubmit">
        <question-form-field-select :on-submit="addChapter" title="Глава" hasAddon>
          <select @change="onChapterSelect(chapterId)" v-model="chapterId">
            <option disabled value>Выберите главу</option>
            <option
              :key="chapter.id"
              v-for="chapter in chapters"
              :value="chapter.id"
            >{{ chapter.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select :on-submit="addSection" title="Раздел" hasAddon>
          <select :disabled="!chapterId" @change="onSectionSelect(sectionId)" v-model="sectionId">
            <option disabled value>Выберите раздел</option>
            <option
              :key="section.id"
              v-for="section in sections"
              :value="section.id"
            >{{ section.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select :on-submit="addParagraph" title="Параграф" hasAddon>
          <select
            :disabled="!sectionId"
            @change="onParagraphSelect(paragraphId)"
            v-model="paragraphId"
          >
            <option disabled value>Выберите параграф</option>
            <option
              :key="paragraph.id"
              v-for="paragraph in paragraphs"
              :value="paragraph.id"
            >{{ paragraph.name }}</option>
          </select>
        </question-form-field-select>
        <question-form-field-select
          :difficulties="difficulties"
          :on-submit="addUnit"
          title="Задание"
          hasAddon
        >
          <select :disabled="!paragraphId" v-model="unitId">
            <option disabled value>Выберите задание</option>
            <option
              :key="unit.id"
              v-for="unit in units"
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
                  :key="typeAnswer.id"
                  v-for="typeAnswer in typeAnswers"
                  :value="typeAnswer.id"
                >{{ typeAnswer.name }}</option>
              </select>
            </question-form-field-select>
          </div>
          <div class="column">
            <question-form-field-select title="Сложность" :hasAddon="false">
              <select v-model="difficulty">
                <option disabled value>Выберите сложность</option>
                <option
                  :key="difficulty.id"
                  v-for="difficulty in difficulties"
                  :value="difficulty.id"
                >{{ difficulty.name }}</option>
              </select>
            </question-form-field-select>
          </div>
        </div>
        <question-form-field title="Вопрос">
          <textarea
            v-model="name"
            placeholder="Введите текст вопроса"
            class="textarea"
            cols="30"
            rows="5"
          ></textarea>
        </question-form-field>
        <question-form-field title="Подсказка">
          <textarea
            v-model="hint"
            placeholder="Введите подсказку к вопросу"
            class="textarea"
            cols="30"
            rows="5"
          ></textarea>
        </question-form-field>
        <div class="field">
          <label class="label">Введите правильный ответ</label>
          <div class="control">
            <input type="text" v-model="answer" class="input">
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
      difficulties: [
        { id: 1, name: "Уровень 1" },
        { id: 2, name: "Уровень 2" },
        { id: 3, name: "Уровень 3" }
      ],
      typeAnswers: [
        { id: "one", name: "Один вариант ответа" },
        { id: "many", name: "Несколько вариантов" },
        { id: "open", name: "Открытый ответ" }
      ],
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
    addUnit(data) {
      const unit = { ...data, paragraphId: this.paragraphId, hint };
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
