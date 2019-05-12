<template>
  <form @submit.prevent="handleSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input v-model="unit.name" required />
        </b-field>
        <b-field label="Сложность">
          <b-input
            placeholder="Выберите сложность вопроса"
            type="number"
            min="1"
            max="3"
          >
          </b-input>
        </b-field>
        <b-field label="Подсказка">
          <b-input
            required
            type="textarea"
            placeholder="Введите подсказку к заданию"
            v-model="unit.hint"
          />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="button" @click="$parent.close()">
          Закрыть
        </button>
        <button type="submit" class="button is-primary">
          Добавить
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ModalFormAddUnit',

  data() {
    return {
      unit: this.createFreshQuestionObject(),
      difficulties: this.$store.state.difficulties
    }
  },

  methods: {
    createFreshQuestionObject() {
      return { name: '', difficulty: null, hint: '' }
    },

    handleSubmit() {
      this.$emit('submit', this.unit)
      this.unit = this.createFreshQuestionObject()
      this.$parent.close()
    }
  }
}
</script>
