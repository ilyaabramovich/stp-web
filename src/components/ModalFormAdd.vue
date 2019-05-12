<template>
  <form @submit.prevent="handleSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input required v-model="name" />
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
  name: 'ModalFormAdd',

  data() {
    return { name: '' }
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.name)
      this.name = ''
      this.$parent.close()
    }
  }
}
</script>
