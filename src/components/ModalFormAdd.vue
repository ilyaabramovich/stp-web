<template>
  <form action>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Введите название">
          <b-input
            :value="name"
            @input="updateValue"
            @blur="$v.name.$touch()"
          />
        </b-field>
        <div v-if="$v.name.$error">
          <b-message
            auto-close
            v-if="!$v.name.required"
            type="is-danger"
            size="is-small"
            >Name is required</b-message
          >
        </div>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="button" @click="$parent.close()">
          Закрыть
        </button>
        <button
          type="button"
          class="button is-primary"
          :disabled="!$v.name.required"
          @click="onAdd"
        >
          Добавить
        </button>
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

    onAdd() {
      this.$emit('submit')
      this.$parent.close()
    }
  }
}
</script>

<style></style>
