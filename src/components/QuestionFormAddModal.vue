<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button
            class="delete is-large"
            aria-label="close"
            @click="$emit('close')"
          ></button>
        </header>
        <section class="modal-card-body">
          <question-form-field>
            <template v-slot:label
              >Введите название</template
            >
            <input v-model="name" type="text" class="input" />
          </question-form-field>

          <div v-if="forUnit">
            <question-form-field>
              <template v-slot:label
                >Сложность</template
              >
              <div class="select is-fullwidth">
                <select v-model="difficulty">
                  <option disabled value>Выберите сложность</option>
                  <option
                    :key="difficulty.id"
                    v-for="difficulty in difficulties"
                    :value="difficulty.id"
                    >{{ difficulty.name }}</option
                  >
                </select>
              </div>
            </question-form-field>
            <question-form-field>
              <template v-slot:label
                >Подсказка</template
              >
              <textarea
                v-model="hint"
                placeholder="Введите подсказку к заданию"
                class="textarea"
                cols="30"
                rows="3"
              ></textarea>
            </question-form-field>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            :disabled="forUnit ? !(name && difficulty && hint) : !name"
            class="button is-success"
            type="button"
            @click="handleSubmit"
          >
            Добавить
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionFormField from './QuestionFormField'

export default {
  name: 'QuestionFormAddModal',
  components: {
    QuestionFormField
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
