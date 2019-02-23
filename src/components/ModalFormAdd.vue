<template>
  <form @submit.prevent="submit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field
          :type="{ 'is-danger': this.$v.name.$error }"
          label="Введите название"
        >
          <b-input v-model="name" @blur="$v.name.$touch()" />
        </b-field>
        <template v-if="$v.name.$error">
          <b-message v-if="!$v.name.required" type="is-danger" size="is-small"
            >Обязательное поле</b-message
          >
        </template>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="button" @click="$parent.close()">
          Закрыть
        </button>
        <button :disabled="$v.$invalid" type="submit" class="button is-primary">
          Добавить
        </button>
        <b-message v-if="$v.$anyError" type="is-danger" size="is-small"
          >Пожалуйста заполните все обязательные поля</b-message
        >
      </footer>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ModalFormAdd',

  data() {
    return { name: '' }
  },

  validations: {
    name: {
      required
    }
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit('submit', this.name)
        this.name = ''
        this.$parent.close()
      }
    }
  }
}
</script>
