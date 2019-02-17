<template>
  <div class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <question-form-field>
            <template v-slot:label
              >Введите название</template
            >
            <input v-model="name" type="text" class="input" />
          </question-form-field>

          <div v-if="forUnit">
            <question-form-field-select title="Сложность" :hasAddon="false">
              <select v-model="difficulty">
                <option disabled value>Выберите сложность</option>
                <option
                  :key="difficulty.id"
                  v-for="difficulty in difficulties"
                  :value="difficulty.id"
                  >{{ difficulty.name }}</option
                >
              </select>
            </question-form-field-select>
            <question-form-field>
              <template v-slot:label
                >Подсказка</template
              >
              <textarea
                v-model="hint"
                placeholder="Введите подсказку к заданию"
                class="textarea"
                cols="30"
                rows="2"
              ></textarea>
            </question-form-field>
          </div>
          <div class="control">
            <button
              :disabled="forUnit ? !(name && difficulty && hint) : !name"
              class="button is-success"
              type="button"
              @click="handleSubmit"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="$emit('close')"
      ></button>
    </div>
  </div>
</template>

<script>
import QuestionFormField from './QuestionFormField'
import QuestionFormFieldSelect from './QuestionFormFieldSelect.vue'

export default {
  name: 'QuestionFormAddModal',
  components: {
    QuestionFormField,
    QuestionFormFieldSelect
  },
  props: {
    forUnit: Boolean
  },
  data() {
    return {
      name: '',
      difficulty: '',
      hint: '',
      difficulties: this.$store.state.difficulties
    }
  },
  methods: {
    handleSubmit() {
      if (!this.forUnit) {
        this.$emit('on-submit', this.name)
      } else {
        this.$emit('on-submit', this.name, this.difficulty, this.hint)
        this.difficulty = ''
        this.hint = ''
      }
      this.name = ''
      this.$emit('close')
    }
  }
}
</script>
