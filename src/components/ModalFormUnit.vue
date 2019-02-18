<template>
  <form action>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Сложность">
          <b-select placeholder="Выберите сложность" v-model="difficulty">
            <option
              v-for="diff in difficulties"
              :value="diff.id"
              :key="diff.id"
              >{{ diff.name }}</option
            >
          </b-select>
        </b-field>

        <b-field label="Подсказка">
          <b-input
            type="textarea"
            v-model="hint"
            placeholder="Введите подсказку к заданию"
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button
          :disabled="!(name && difficulty && hint)"
          class="button is-primary"
          @click="onAdd"
        >
          Добавить
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ModalFormUnit',
  data() {
    return {
      name: '',
      difficulty: null,
      hint: '',
      difficulties: this.$store.state.difficulties
    }
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onAdd() {
      this.onSubmit(this.name, this.difficulty, this.hint)
      this.name = ''
      this.difficulty = ''
      this.hint = ''
      this.$parent.close()
    }
  }
}
</script>

<style></style>
