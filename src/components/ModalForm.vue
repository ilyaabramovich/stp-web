<template>
  <form action>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input v-model="name" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button :disabled="!name" class="button is-primary" @click="onSubmit">
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
    onSubmit() {
      this.$emit('on-submit', this.name)
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
