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
        <button type="button" class="button" @click="chapterModal()">
          Добавить
        </button>
      </p>
    </b-field>

    <b-field @submit="createSection">
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
          type="button"
          class="button"
          :disabled="!question.chapterId"
          @click="sectionModal()"
        >
          Добавить
        </button>
      </p>
    </b-field>

    <b-field @submit="createParagraph">
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
          type="button"
          class="button"
          :disabled="!question.sectionId"
          @click="paragraphModal()"
        >
          Добавить
        </button>
      </p>
    </b-field>

    <b-field @submit="createUnit">
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

    <b-field grouped>
      <b-select
        placeholder="Выберите тип вопроса"
        v-model="question.typeAnswer"
        expanded
      >
        <option
          v-for="questionType in questionTypes"
          :value="questionType.id"
          :key="questionType.id"
          >{{ questionType.type }}</option
        >
      </b-select>
      <b-select
        placeholder="Выберите сложность вопроса"
        v-model.number="question.difficulty"
        expanded
      >
        <option
          v-for="(difficulty, index) in difficulties"
          :value="index + 1"
          :key="index"
          >{{ difficulty }}</option
        >
      </b-select>
    </b-field>

    <b-field>
      <b-input
        type="textarea"
        placeholder="Введите текст вопроса"
        v-model.trim="question.name"
      ></b-input>
    </b-field>
    <b-field>
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
          :disabled="isAddQuestionButtonDisabled"
          @click="addQuestion"
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
import ModalFormAdd from './ModalFormAdd'
import ModalFormAddUnit from './ModalFormAddUnit'

export default {
  name: 'Form',
  data() {
    return {
      modalFormAdd: {
        name: ''
      },
      question: this.createFreshQuestionObject(),
      questionTypes: [
        { id: 'one', type: 'Один вариант ответа' },
        { id: 'many', type: 'Несколько вариантов' },
        { id: 'open', type: 'Свободный ответ' }
      ]
    }
  },
  computed: {
    isAddQuestionButtonDisabled() {
      const { answer, name, unitId, hint } = this.question
      return !(answer && name && unitId && hint)
    },
    ...mapState(['chapters', 'sections', 'paragraphs', 'units', 'difficulties'])
  },
  created() {
    this.fetchChapters()
  },
  methods: {
    chapterModal() {
      this.$modal.open({
        parent: this,
        component: ModalFormAdd,
        hasModalCard: true,
        props: this.modalFormAdd,
        events: {
          input: value => {
            this.modalFormAdd.name = value
          },
          submit: this.createChapter
        }
      })
    },
    sectionModal() {
      this.$modal.open({
        parent: this,
        component: ModalFormAdd,
        hasModalCard: true,
        props: this.modalFormAdd,
        events: {
          input: value => {
            this.modalFormAdd.name = value
          },
          submit: this.createSection
        }
      })
    },
    paragraphModal() {
      this.$modal.open({
        parent: this,
        component: ModalFormAdd,
        hasModalCard: true,
        props: this.modalFormAdd,
        events: {
          input: value => {
            this.modalFormAdd.name = value
          },
          submit: this.createParagraph
        }
      })
    },
    unitModal() {
      this.$modal.open({
        parent: this,
        component: ModalFormAddUnit,
        hasModalCard: true,
        events: {
          submit: this.createUnit
        }
      })
    },
    ...mapActions([
      'fetchChapters',
      'fetchSections',
      'fetchParagraphs',
      'fetchUnits',
      'fetchTests',
      'createQuestion'
    ]),
    ...mapActions({
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
    addQuestion() {
      this.createQuestion(this.question)
      this.$toast.open({
        message: 'Вопрос успешно добавлен!',
        type: 'is-success'
      })
      this.question = this.createFreshQuestionObject()
    },
    createChapter() {
      const chapter = { name: this.modalFormAdd.name }
      this.modalFormAdd.name = ''
      this.addChapter(chapter)
      this.$toast.open({
        message: 'Успешно добавлено!',
        type: 'is-success'
      })
    },
    createSection() {
      const section = {
        name: this.modalFormAdd.name,
        chapterId: this.question.chapterId
      }
      this.modalFormAdd.name = ''
      this.addSection(section)
      this.$toast.open({
        message: 'Успешно добавлено!',
        type: 'is-success'
      })
    },
    createParagraph() {
      const paragraph = {
        name: this.modalFormAdd.name,
        sectionId: this.question.sectionId
      }
      this.modalFormAdd.name = ''
      this.addParagraph(paragraph)
      this.$toast.open({
        message: 'Успешно добавлено!',
        type: 'is-success'
      })
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
