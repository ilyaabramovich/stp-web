<template>
  <form @submit.prevent="handleSubmit" action="/questions" method="post">
    <b-field grouped>
      <b-select
        placeholder="Выберите главу"
        v-model.number="question.chapterId"
        @input="fetchSections(question.chapterId)"
        expanded
        required
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
    <b-field grouped>
      <b-select
        placeholder="Выберите раздел"
        :disabled="!question.chapterId"
        v-model.number="question.sectionId"
        @input="fetchParagraphs(question.sectionId)"
        expanded
        required
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
    <b-field grouped>
      <b-select
        placeholder="Выберите параграф"
        :disabled="!question.sectionId"
        v-model.number="question.paragraphId"
        @input="fetchUnits(question.paragraphId)"
        expanded
        required
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
    <b-field grouped>
      <b-select
        placeholder="Выберите задание"
        :disabled="!question.paragraphId"
        v-model.number="question.unitId"
        expanded
        required
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
    <b-field>
      <b-select
        placeholder="Выберите тип вопроса"
        v-model="question.typeAnswer"
        expanded
        required
      >
        <option
          v-for="questionType in questionTypes"
          :value="questionType.id"
          :key="questionType.id"
          >{{ questionType.type }}</option
        >
      </b-select>
    </b-field>
    <b-field>
      <b-input
        placeholder="Выберите сложность вопроса"
        type="number"
        min="1"
        max="3"
        required
      >
      </b-input>
    </b-field>
    <b-field>
      <b-input
        type="textarea"
        placeholder="Введите текст вопроса"
        v-model.trim="question.name"
        required
      />
    </b-field>
    <b-field>
      <b-input
        type="textarea"
        placeholder="Введите подсказку к вопросу"
        v-model.trim="question.hint"
        required
      />
    </b-field>
    <b-field>
      <b-input
        placeholder="Введите правильный ответ"
        v-model.trim="question.answer"
        required
      />
    </b-field>
    <b-field grouped>
      <p class="control">
        <button type="submit" class="button is-primary">
          Добавить вопрос
        </button>
      </p>
      <p class="control">
        <button type="button" class="button" @click="fetchTests">
          Сгенерировать тест .json
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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

  computed: mapState(['chapters', 'sections', 'paragraphs', 'units']),

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
      this.createQuestion(this.question)
        .then(() => {
          this.question = this.createFreshQuestionObject()
        })
        .catch(() => {})
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
