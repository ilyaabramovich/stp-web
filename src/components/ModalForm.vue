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
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="button" @click="$parent.close()">
          Закрыть
        </button>
        <button class="button is-primary" :disabled="!name" @click="onAdd">
          Добавить
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ModalForm',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    onAdd() {
      this.$emit('submit', this.name)
      this.name = ''
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
