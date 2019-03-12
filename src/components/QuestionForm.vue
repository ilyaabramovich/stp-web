<template>
  <form @submit.prevent="handleSubmit">
    <b-field :type="{ 'is-danger': this.$v.question.chapterId.$error }">
      <b-select
        placeholder="Выберите главу"
        v-model.number="question.chapterId"
        @input="fetchSections(question.chapterId)"
        expanded
        @blur="$v.question.chapterId.$touch()"
      >
        <option
          v-for="chapter in chapters"
          :value="chapter.id"
          :key="chapter.id"
          >{{ chapter.name }}</option
        >
      </b-select>
      <p class="control">
        <button type="button" class="button" @click="openModal(addChapter)">
          Добавить
        </button>
      </p>
    </b-field>
    <template v-if="$v.question.chapterId.$error">
      <b-message
        v-if="!$v.question.chapterId.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field :type="{ 'is-danger': this.$v.question.sectionId.$error }">
      <b-select
        placeholder="Выберите раздел"
        :disabled="!question.chapterId"
        v-model.number="question.sectionId"
        @input="fetchParagraphs(question.sectionId)"
        expanded
        @blur="$v.question.sectionId.$touch()"
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
          type="button"
          class="button"
          :disabled="!question.chapterId"
          @click="openModal(addSection)"
        >
          Добавить
        </button>
      </p>
    </b-field>
    <template v-if="$v.question.sectionId.$error">
      <b-message
        v-if="!$v.question.sectionId.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field :type="{ 'is-danger': this.$v.question.paragraphId.$error }">
      <b-select
        placeholder="Выберите параграф"
        :disabled="!question.sectionId"
        v-model.number="question.paragraphId"
        @input="fetchUnits(question.paragraphId)"
        expanded
        @blur="$v.question.paragraphId.$touch()"
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
          type="button"
          class="button"
          :disabled="!question.sectionId"
          @click="openModal(addParagraph)"
        >
          Добавить
        </button>
      </p>
    </b-field>
    <template v-if="$v.question.paragraphId.$error">
      <b-message
        v-if="!$v.question.paragraphId.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field :type="{ 'is-danger': this.$v.question.unitId.$error }">
      <b-select
        placeholder="Выберите задание"
        :disabled="!question.paragraphId"
        v-model.number="question.unitId"
        expanded
        @blur="$v.question.unitId.$touch()"
      >
        <option v-for="unit in units" :value="unit.id" :key="unit.id">
          {{ unit.name }} ({{ unit.hint }}) Сложность:
          {{ unit.difficulty }}
        </option>
      </b-select>
      <p class="control">
        <button
          type="button"
          class="button"
          :disabled="!question.paragraphId"
          @click="unitModal()"
        >
          Добавить
        </button>
      </p>
    </b-field>
    <template v-if="$v.question.unitId.$error">
      <b-message
        v-if="!$v.question.unitId.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field
      :type="{
        'is-danger':
          this.$v.question.typeAnswer.$error ||
          this.$v.question.difficulty.$error
      }"
      grouped
    >
      <b-select
        placeholder="Выберите тип вопроса"
        v-model="question.typeAnswer"
        expanded
        @blur="$v.question.typeAnswer.$touch()"
      >
        <option
          v-for="questionType in questionTypes"
          :value="questionType.id"
          :key="questionType.id"
          >{{ questionType.type }}</option
        >
      </b-select>
      <template v-if="$v.question.typeAnswer.$error">
        <b-message
          class="control"
          v-if="!$v.question.typeAnswer.required"
          type="is-danger"
          size="is-small"
          >Обязательное поле</b-message
        >
      </template>
      <b-select
        placeholder="Выберите сложность вопроса"
        v-model.number="question.difficulty"
        expanded
        @blur="$v.question.difficulty.$touch()"
      >
        <option
          v-for="(difficulty, index) in difficulties"
          :value="index + 1"
          :key="index"
          >{{ difficulty }}</option
        >
      </b-select>
      <template v-if="$v.question.difficulty.$error">
        <b-message
          v-if="!$v.question.difficulty.required"
          type="is-danger"
          size="is-small"
          >Обязательное поле</b-message
        >
      </template>
    </b-field>

    <b-field :type="{ 'is-danger': this.$v.question.name.$error }">
      <b-input
        type="textarea"
        placeholder="Введите текст вопроса"
        v-model.trim="question.name"
        @blur="$v.question.name.$touch()"
      />
    </b-field>
    <template v-if="$v.question.name.$error">
      <b-message
        v-if="!$v.question.name.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field :type="{ 'is-danger': this.$v.question.hint.$error }">
      <b-input
        type="textarea"
        placeholder="Введите подсказку к вопросу"
        v-model.trim="question.hint"
        @blur="$v.question.hint.$touch()"
      />
    </b-field>
    <template v-if="$v.question.hint.$error">
      <b-message
        v-if="!$v.question.hint.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field :type="{ 'is-danger': this.$v.question.answer.$error }">
      <b-input
        placeholder="Введите правильный ответ"
        v-model.trim="question.answer"
        @blur="$v.question.answer.$touch()"
      />
    </b-field>
    <template v-if="$v.question.answer.$error">
      <b-message
        v-if="!$v.question.answer.required"
        type="is-danger"
        size="is-small"
        >Обязательное поле</b-message
      >
    </template>

    <b-field grouped>
      <p class="control">
        <button type="submit" class="button is-primary" :disabled="$v.$invalid">
          Добавить вопрос
        </button>
      </p>
      <b-message
        class="control"
        v-if="$v.$anyError"
        type="is-danger"
        size="is-small"
        >Пожалуйста заполните все обязательные поля</b-message
      >
      <p class="control">
        <button
          type="button"
          class="button is-primary is-outlined"
          @click="fetchTests"
        >
          Сгенерировать тест .json
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import ModalFormAdd from '@/components/ModalFormAdd'
import ModalFormAddUnit from '@/components/ModalFormAddUnit'

export default {
  name: 'QuestionForm',

  data() {
    return {
      question: this.createFreshQuestionObject(),
      questionTypes: [
        { id: 'one', type: 'Один вариант ответа' },
        { id: 'many', type: 'Несколько вариантов' },
        { id: 'open', type: 'Свободный ответ' }
      ]
    }
  },

  validations: {
    question: {
      chapterId: { required },
      sectionId: { required },
      paragraphId: { required },
      unitId: { required },
      typeAnswer: { required },
      difficulty: { required },
      name: { required },
      hint: { required },
      answer: { required }
    }
  },

  computed: mapState([
    'chapters',
    'sections',
    'paragraphs',
    'units',
    'difficulties'
  ]),

  created() {
    this.fetchChapters()
  },

  methods: {
    openModal(submit, component = ModalFormAdd) {
      this.$modal.open({
        parent: this,
        component,
        hasModalCard: true,
        events: {
          submit
        }
      })
    },
    unitModal() {
      this.openModal(this.addUnit, ModalFormAddUnit)
    },
    ...mapActions([
      'fetchChapters',
      'fetchSections',
      'fetchParagraphs',
      'fetchUnits',
      'fetchTests',
      'createQuestion',
      'createChapter',
      'createSection',
      'createParagraph',
      'createUnit'
    ]),

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

    handleSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createQuestion(this.question)
          .then(() => {
            this.question = this.createFreshQuestionObject()
          })
          .catch(() => {})
      }
    },

    addChapter(name) {
      const chapter = { name }
      this.createChapter(chapter)
    },

    addSection(name) {
      const section = {
        name,
        chapterId: this.question.chapterId
      }
      this.createSection(section)
    },

    addParagraph(name) {
      const paragraph = {
        name,
        sectionId: this.question.sectionId
      }
      this.createParagraph(paragraph)
    },

    addUnit(unit) {
      this.createUnit({ ...unit, paragraphId: this.question.paragraphId })
    }
  }
}
</script>
