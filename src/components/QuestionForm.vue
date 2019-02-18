<template>
  <section>
    <b-field>
      <b-select
        placeholder="Выберите главу"
        @input="onChapterChange(question.chapterId)"
        v-model.number="question.chapterId"
        expanded
      >
        <option
          v-for="chapter in chapters"
          :key="chapter.id"
          :value="chapter.id"
          >{{ chapter.name }}</option
        >
      </b-select>
      <p class="control">
        <button type="button" class="button" @click="showModalChapter = true">
          Добавить
        </button>
        <b-modal :active.sync="showModalChapter" has-modal-card>
          <modal-form :on-submit="createChapter"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field :on-submit="createSection">
      <b-select
        placeholder="Выберите раздел"
        v-model.number="question.sectionId"
        @input="onSectionChange(question.sectionId)"
        :disabled="!question.chapterId"
        expanded
      >
        <option
          v-for="section in sections"
          :key="section.id"
          :value="section.id"
          >{{ section.name }}</option
        >
      </b-select>
      <p class="control">
        <button
          type="button"
          class="button"
          @click="showModalSection = true"
          :disabled="!question.chapterId"
        >
          Добавить
        </button>
        <b-modal :active.sync="showModalSection" has-modal-card>
          <modal-form :on-submit="createSection"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field :on-submit="createParagraph">
      <b-select
        placeholder="Выберите параграф"
        v-model.number="question.paragraphId"
        @input="onParagraphChange(question.paragraphId)"
        :disabled="!question.sectionId"
        expanded
      >
        <option
          v-for="paragraph in paragraphs"
          :key="paragraph.id"
          :value="paragraph.id"
          >{{ paragraph.name }}</option
        >
      </b-select>
      <p class="control">
        <button
          type="button"
          class="button"
          @click="showModalParagraph = true"
          :disabled="!question.sectionId"
        >
          Добавить
        </button>
        <b-modal :active.sync="showModalParagraph" has-modal-card>
          <modal-form :on-submit="createParagraph"></modal-form>
        </b-modal>
      </p>
    </b-field>

    <b-field :on-submit="createUnit" :for-unit="true">
      <b-select
        placeholder="Выберите задание"
        v-model.number="question.unitId"
        :disabled="!question.paragraphId"
        expanded
      >
        <option v-for="unit in units" :key="unit.id" :value="unit.id">
          {{ unit.name }} ({{ unit.hint }}) Сложность:
          {{ unit.difficulty }}
        </option>
      </b-select>
      <p class="control">
        <b-modal :active.sync="showModalUnit" has-modal-card>
          <modal-form-unit :on-submit="createUnit"></modal-form-unit>
        </b-modal>
        <button
          type="button"
          class="button"
          @click="showModalUnit = true"
          :disabled="!question.paragraphId"
        >
          Добавить
        </button>
      </p>
    </b-field>

    <b-field grouped>
      <b-field label="Тип вопроса">
        <b-select placeholder="Выберите тип" v-model="question.typeAnswer">
          <option
            v-for="typeAnswer in typeAnswers"
            :key="typeAnswer.id"
            :value="typeAnswer.id"
            >{{ typeAnswer.name }}</option
          >
        </b-select>
      </b-field>

      <b-field label="Сложность">
        <b-select
          placeholder="Выберите сложность"
          v-model.number="question.difficulty"
        >
          <option
            v-for="difficulty in difficulties"
            :key="difficulty.id"
            :value="difficulty.id"
            >{{ difficulty.name }}</option
          >
        </b-select>
      </b-field>
    </b-field>

    <b-field label="Вопрос">
      <b-input
        placeholder="Введите текст вопроса"
        type="textarea"
        v-model.trim="question.name"
      ></b-input>
    </b-field>
    <b-field label="Подсказка">
      <b-input
        placeholder="Введите подсказку к вопросу"
        type="textarea"
        v-model.trim="question.hint"
      ></b-input>
    </b-field>

    <b-field label="Введите правильный ответ">
      <b-input v-model.trim="question.answer"></b-input>
    </b-field>

    <b-field grouped>
      <p class="control">
        <button
          class="button is-primary"
          type="button"
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
        <button
          class="button is-primary is-outlined"
          type="button"
          @click="onGenerateClick"
        >
          Сгенерировать тест .json
        </button>
      </p>
    </b-field>
  </section>
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
        { id: 'open', name: 'Открытый ответ' }
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
    },
    onChapterChange(chapterId) {
      this.fetchSections(chapterId)
    },
    onSectionChange(sectionId) {
      this.fetchParagraphs(sectionId)
    },
    onParagraphChange(paragraphId) {
      this.fetchUnits(paragraphId)
    },
    onGenerateClick() {
      this.fetchTests()
    }
  }
}
</script>
