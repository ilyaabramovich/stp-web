<template>
  <form action>
    <b-field>
      <b-select
        placeholder="Выберите главу"
        v-model.number="question.chapterId"
        @input="fetchSections(question.chapterId)"
        expanded
      >
        <option
          v-for="chapter in chapters"
          :value="chapter.id"
          :key="chapter.id"
          >{{ chapter.name }}</option
        >
      </b-select>
      <p class="control">
        <button class="button" @click="showModalChapter = true">
          Добавить
        </button>
        <b-modal :active.sync="showModalChapter" has-modal-card>
          <modal-form @on-submit="createChapter"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field @on-submit="createSection">
      <b-select
        placeholder="Выберите раздел"
        :disabled="!question.chapterId"
        v-model.number="question.sectionId"
        @input="fetchParagraphs(question.sectionId)"
        expanded
      >
        <option
          v-for="section in sections"
          :value="section.id"
          :key="section.id"
          >{{ section.name }}</option
        >
      </b-select>
      <p class="control">
        <button
          class="button"
          :disabled="!question.chapterId"
          @click="showModalSection = true"
        >
          Добавить
        </button>
        <b-modal :active.sync="showModalSection" has-modal-card>
          <modal-form @on-submit="createSection"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field @on-submit="createParagraph">
      <b-select
        placeholder="Выберите параграф"
        :disabled="!question.sectionId"
        v-model.number="question.paragraphId"
        @input="fetchUnits(question.paragraphId)"
        expanded
      >
        <option
          v-for="paragraph in paragraphs"
          :value="paragraph.id"
          :key="paragraph.id"
          >{{ paragraph.name }}</option
        >
      </b-select>
      <p class="control">
        <button
          class="button"
          :disabled="!question.sectionId"
          @click="showModalParagraph = true"
        >
          Добавить
        </button>
        <b-modal :active.sync="showModalParagraph" has-modal-card>
          <modal-form @on-submit="createParagraph"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field @on-submit="createUnit">
      <b-select
        placeholder="Выберите задание"
        :disabled="!question.paragraphId"
        v-model.number="question.unitId"
        expanded
      >
        <option v-for="unit in units" :value="unit.id" :key="unit.id">
          {{ unit.name }} ({{ unit.hint }}) Сложность:
          {{ unit.difficulty }}
        </option>
      </b-select>
      <p class="control">
        <b-modal :active.sync="showModalUnit" has-modal-card>
          <modal-form-unit @on-submit="createUnit"></modal-form-unit>
        </b-modal>
        <button
          class="button"
          :disabled="!question.paragraphId"
          @click="showModalUnit = true"
        >
          Добавить
        </button>
      </p>
    </b-field>

    <b-field grouped>
      <b-select
        placeholder="Выберите тип вопроса"
        v-model="question.typeAnswer"
        expanded
      >
        <option
          v-for="typeAnswer in typeAnswers"
          :value="typeAnswer.id"
          :key="typeAnswer.id"
          >{{ typeAnswer.name }}</option
        >
      </b-select>
      <b-select
        placeholder="Выберите сложность вопроса"
        v-model.number="question.difficulty"
        expanded
      >
        <option
          v-for="difficulty in difficulties"
          :value="difficulty.id"
          :key="difficulty.id"
          >{{ difficulty.name }}</option
        >
      </b-select>
    </b-field>

    <b-field label="Вопрос">
      <b-input
        type="textarea"
        placeholder="Введите текст вопроса"
        v-model.trim="question.name"
      ></b-input>
    </b-field>
    <b-field label="Подсказка">
      <b-input
        type="textarea"
        placeholder="Введите подсказку к вопросу"
        v-model.trim="question.hint"
      ></b-input>
    </b-field>

    <b-field>
      <b-input
        placeholder="Введите правильный ответ"
        v-model.trim="question.answer"
      ></b-input>
    </b-field>

    <b-field grouped>
      <p class="control">
        <button
          class="button is-primary"
          :disabled="
            !(
              question.answer &&
              question.name &&
              question.unitId &&
              question.hint
            )
          "
          @click="onSubmit"
        >
          Добавить вопрос
        </button>
      </p>
      <p class="control">
        <button class="button is-primary is-outlined" @click="fetchTests">
          Сгенерировать тест .json
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalForm from './ModalForm'
import ModalFormUnit from './ModalFormUnit'

export default {
  name: 'Form',
  components: {
    ModalForm,
    ModalFormUnit
  },
  data() {
    return {
      showModalChapter: false,
      showModalSection: false,
      showModalParagraph: false,
      showModalUnit: false,
      question: this.createFreshQuestionObject(),
      typeAnswers: [
        { id: 'one', name: 'Один вариант ответа' },
        { id: 'many', name: 'Несколько вариантов' },
        { id: 'open', name: 'Свободный ответ' }
      ]
    }
  },
  created() {
    this.fetchChapters()
  },
  computed: mapState([
    'chapters',
    'sections',
    'paragraphs',
    'units',
    'difficulties'
  ]),
  methods: {
    ...mapActions([
      'fetchChapters',
      'fetchSections',
      'fetchParagraphs',
      'fetchUnits',
      'fetchTests'
    ]),
    ...mapActions({
      addQuestion: 'createQuestion',
      addChapter: 'createChapter',
      addSection: 'createSection',
      addParagraph: 'createParagraph',
      addUnit: 'createUnit'
    }),
    createFreshQuestionObject() {
      return {
        chapterId: null,
        sectionId: null,
        paragraphId: null,
        unitId: null,
        typeAnswer: null,
        difficulty: null,
        name: '',
        hint: '',
        answer: ''
      }
    },
    onSubmit() {
      this.addQuestion(this.question)
      this.$toast.open({
        message: 'Вопрос успешно добавлен!',
        type: 'is-success'
      })
      this.question = this.createFreshQuestionObject()
    },
    createChapter(name) {
      const chapter = { name }
      this.addChapter(chapter)
    },
    createSection(name) {
      const section = { name, chapterId: this.question.chapterId }
      this.addSection(section)
    },
    createParagraph(name) {
      const paragraph = { name, sectionId: this.question.sectionId }
      this.addParagraph(paragraph)
    },
    createUnit(name, difficulty, hint) {
      const unit = {
        name,
        paragraphId: this.question.paragraphId,
        difficulty,
        hint
      }
      this.addUnit(unit)
    }
  }
}
</script>
