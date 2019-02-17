<template>
  <div class="container">
    <div class="box">
      <form>
        <question-form-field-select :on-submit="createChapter" title="Глава">
          <select
            @change="onChapterChange(question.chapterId)"
            v-model.number="question.chapterId"
          >
            <option disabled value>Выберите главу</option>
            <option
              v-for="chapter in chapters"
              :key="chapter.id"
              :value="chapter.id"
              >{{ chapter.name }}</option
            >
          </select>
        </question-form-field-select>
        <question-form-field-select
          v-show="question.chapterId"
          :on-submit="createSection"
          title="Раздел"
        >
          <select
            v-model.number="question.sectionId"
            @change="onSectionChange(question.sectionId)"
          >
            <option disabled value>Выберите раздел</option>
            <option
              v-for="section in sections"
              :key="section.id"
              :value="section.id"
              >{{ section.name }}</option
            >
          </select>
        </question-form-field-select>
        <question-form-field-select
          :on-submit="createParagraph"
          v-show="question.sectionId"
          title="Параграф"
        >
          <select
            v-model.number="question.paragraphId"
            @change="onParagraphChange(question.paragraphId)"
          >
            <option disabled value>Выберите параграф</option>
            <option
              v-for="paragraph in paragraphs"
              :key="paragraph.id"
              :value="paragraph.id"
              >{{ paragraph.name }}</option
            >
          </select>
        </question-form-field-select>
        <question-form-field-select
          v-show="question.paragraphId"
          :on-submit="createUnit"
          :for-unit="true"
          title="Задание"
        >
          <select v-model.number="question.unitId">
            <option disabled value>Выберите задание</option>
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.name }} ({{ unit.hint }}) Сложность:
              {{ unit.difficulty }}
            </option>
          </select>
        </question-form-field-select>
        <div class="columns">
          <div class="column is-three-quarters">
            <question-form-field>
              <template v-slot:label
                >Тип вопроса</template
              >
              <div class="select is-fullwidth">
                <select v-model="question.typeAnswer">
                  <option disabled value>Выберите тип</option>
                  <option
                    v-for="typeAnswer in typeAnswers"
                    :key="typeAnswer.id"
                    :value="typeAnswer.id"
                    >{{ typeAnswer.name }}</option
                  >
                </select>
              </div>
            </question-form-field>
          </div>
          <div class="column">
            <question-form-field>
              <template v-slot:label
                >Сложность</template
              >
              <div class="select is-fullwidth">
                <select v-model.number="question.difficulty">
                  <option disabled value>Выберите сложность</option>
                  <option
                    v-for="difficulty in difficulties"
                    :key="difficulty.id"
                    :value="difficulty.id"
                    >{{ difficulty.name }}</option
                  >
                </select>
              </div>
            </question-form-field>
          </div>
        </div>
        <question-form-field>
          <template v-slot:label
            >Вопрос</template
          >
          <textarea
            placeholder="Введите текст вопроса"
            class="textarea"
            cols="30"
            rows="3"
            v-model.trim="question.name"
          ></textarea>
        </question-form-field>
        <question-form-field>
          <template v-slot:label
            >Подсказка</template
          >
          <textarea
            placeholder="Введите подсказку к вопросу"
            class="textarea"
            cols="30"
            rows="3"
            v-model.trim="question.hint"
          ></textarea>
        </question-form-field>
        <question-form-field>
          <template v-slot:label
            >Введите правильный ответ</template
          >
          <input type="text" v-model.trim="question.answer" class="input" />
        </question-form-field>
        <div class="field is-grouped">
          <div class="control">
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
          </div>
          <div class="control">
            <button
              class="button is-primary is-outlined"
              type="button"
              @click="onGenerateClick"
            >
              Сгенерировать тест .json
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import QuestionFormFieldSelect from './QuestionFormFieldSelect.vue'
import QuestionFormField from './QuestionFormField.vue'
import { mapState } from 'vuex'

export default {
  name: 'Form',
  components: {
    QuestionFormFieldSelect,
    QuestionFormField
  },
  data() {
    return {
      question: this.createFreshQuestionObject(),
      difficulties: this.$store.state.difficulties,
      typeAnswers: [
        { id: 'one', name: 'Один вариант ответа' },
        { id: 'many', name: 'Несколько вариантов' },
        { id: 'open', name: 'Открытый ответ' }
      ]
    }
  },
  created() {
    this.$store.dispatch('fetchChapters')
  },
  computed: mapState(['chapters', 'sections', 'paragraphs', 'units']),
  methods: {
    createFreshQuestionObject() {
      return {
        chapterId: '',
        sectionId: '',
        paragraphId: '',
        hint: '',
        unitId: '',
        name: '',
        difficulty: '',
        typeAnswer: '',
        answer: ''
      }
    },
    onSubmit() {
      this.$store.dispatch('createQuestion', this.question)
      this.question = this.createFreshQuestionObject()
    },
    createChapter(name) {
      const chapter = { name }
      this.$store.dispatch('createChapter', chapter)
    },
    createSection(name) {
      const section = { name, chapterId: this.question.chapterId }
      this.$store.dispatch('createSection', section)
    },
    createParagraph(name) {
      const paragraph = { name, sectionId: this.question.sectionId }
      this.$store.dispatch('createParagraph', paragraph)
    },
    createUnit(name, difficulty, hint) {
      const unit = {
        name,
        paragraphId: this.question.paragraphId,
        difficulty,
        hint
      }
      this.$store.dispatch('createUnit', unit)
    },
    onChapterChange(chapterId) {
      this.$store.dispatch('fetchSections', chapterId)
    },
    onSectionChange(sectionId) {
      this.$store.dispatch('fetchParagraphs', sectionId)
    },
    onParagraphChange(paragraphId) {
      this.$store.dispatch('fetchUnits', paragraphId)
    },
    onGenerateClick() {
      this.$store.dispatch('fetchTests')
    }
  }
}
</script>
