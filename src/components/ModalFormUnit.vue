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
            placeholder="Введите подсказку к заданию"
            v-model="hint"
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="$parent.close()">Close</button>
        <button
          class="button is-primary"
          :disabled="!(name && difficulty && hint)"
          @click="onSubmit"
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
  methods: {
    onSubmit() {
      this.$emit('on-submit', this.name, this.difficulty, this.hint)
      this.name = ''
      this.difficulty = null
      this.hint = ''
      this.$parent.close()
      this.$toast.open({
        message: 'Успешно добавлено!',
        type: 'is-success'
      })
    }
  }
}
</script>

<style></style>
