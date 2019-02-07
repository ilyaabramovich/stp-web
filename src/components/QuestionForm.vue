<template>
  <div class="container">
    <div class="box">
      <form>
        <select-container :on-submit="addChapter" title="Глава" hasAddon>
          <select @change="onChapterChange(chapterId)" v-model="chapterId">
            <option disabled value>Выберите главу</option>
            <option
              :key="chapter.id"
              v-for="chapter in chapters"
              :value="chapter.id"
            >{{ chapter.name }}</option>
          </select>
        </select-container>
        <select-container :on-submit="addSection" title="Раздел" hasAddon>
          <select :disabled="!chapterId" @change="onSectionChange(sectionId)" v-model="sectionId">
            <option disabled value>Выберите раздел</option>
            <option
              :key="section.id"
              v-for="section in sections"
              :value="section.id"
            >{{ section.name }}</option>
          </select>
        </select-container>
        <select-container :on-submit="addParagraph" title="Параграф" hasAddon>
          <select
            :disabled="!sectionId"
            @change="onParagraphChange(paragraphId)"
            v-model="paragraphId"
          >
            <option disabled value>Выберите параграф</option>
            <option
              :key="paragraph.id"
              v-for="paragraph in paragraphs"
              :value="paragraph.id"
            >{{ paragraph.name }}</option>
          </select>
        </select-container>
        <select-container
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
        </select-container>
        <div class="columns">
          <div class="column is-three-quarters">
            <select-container title="Тип вопроса" :hasAddon="false">
              <select v-model="typeAnswer">
                <option disabled value>Выберите тип</option>
                <option
                  :key="typeAnswer.id"
                  v-for="typeAnswer in typeAnswers"
                  :value="typeAnswer.id"
                >{{ typeAnswer.name }}</option>
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
            <button
              class="button is-success"
              :disabled="!(answer&&name&&unitId&&hint)"
              type="button"
              @click="addQuestion"
            >Добавить вопрос</button>
          </div>
          <div class="control">
            <button class="button is-primary" type="button" @click="generateJSON">Сгенерировать JSON</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectContainer from "./SelectContainer.vue";
import QuestionFormField from "./QuestionFormField.vue";
import * as api from "../services/DbService";

export default {
  name: "Form",
  components: {
    SelectContainer,
    QuestionFormField
  },
  props: {
    typeAnswers: Array,
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
      chapterId: "",
      sectionId: "",
      paragraphId: "",
      hint: "",
      unitId: "",
      name: "",
      difficulty: "",
      typeAnswer: "",
      answer: ""
    };
  },
  methods: {
    generateJSON: function() {
      return api
        .generateJSON()
        .then(res => {
          alert("JSON сгенерирован!");
          // eslint-disable-next-line
          console.log(res.data);
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addQuestion: function() {
      return (
        api
          .addQuestion({
            unitId: this.unitId,
            name: this.name,
            hint: this.hint,
            typeAnswer: this.typeAnswer,
            answer: this.answer
          })
          .then(() => {
            alert("Вопрос добавлен!");
            // eslint-disable-next-line
          })
          // eslint-disable-next-line
          .catch(error => console.error(error))
      );
    },
    addChapter: function(name) {
      return api
        .addChapter({
          name
        })
        .then(() => {
          alert("Глава добавлена!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addSection: function(name) {
      return api
        .addSection({
          name,
          chapterId: this.chapterId
        })
        .then(() => {
          alert("Раздел добавлен!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addParagraph: function(name) {
      return api
        .addParagraph({
          name,
          sectionId: this.sectionId
        })
        .then(() => {
          alert("Параграф добавлен!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    addUnit: function(name, difficulty, hint) {
      return api
        .addUnit({
          name,
          paragraphId: this.paragraphId,
          difficulty,
          hint
        })
        .then(() => {
          alert("Задание добавлено!");
          // eslint-disable-next-line
        }) // eslint-disable-next-line
        .catch(error => console.error(error));
    }
  }
};
</script>
