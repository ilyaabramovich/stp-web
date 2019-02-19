<template>
  <form action>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input @input="updateValue"></b-input>
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
  name: 'ModalFormAdd',
  props: {
    name: { type: String, default: '' }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },
    onAdd() {
      this.$emit('submit')
      this.$parent.close()
    }
  }
}
</script>

<style></style>
