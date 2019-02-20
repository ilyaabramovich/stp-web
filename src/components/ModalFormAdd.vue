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
          <b-input
            :value="name"
            @input="updateValue"
            @blur="$v.name.$touch()"
          />
        </b-field>
        <template v-if="$v.name.$error">
          <b-message v-if="!$v.name.required" type="is-danger" size="is-small"
            >Name is required</b-message
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
          >Please fill out the required fields</b-message
        >
      </footer>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ModalFormAdd',

  props: {
    name: { type: String, default: '', required: true }
  },

  validations: {
    name: {
      required
    }
  },

  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },

    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit('submit')
        this.$parent.close()
      }
    }
  }
}
</script>

<style></style>
