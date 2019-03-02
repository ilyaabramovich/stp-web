<template>
  <form @submit.prevent="handleSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавление</p>
      </header>
      <section class="modal-card-body">
        <b-field
          :type="{ 'is-danger': this.$v.unit.name.$error }"
          label="Введите название"
        >
          <b-input v-model="unit.name" @blur="$v.unit.name.$touch()" />
        </b-field>
        <template v-if="$v.unit.name.$error">
          <b-message
            v-if="!$v.unit.name.required"
            type="is-danger"
            size="is-small"
            >Обязательное поле</b-message
          >
        </template>

        <b-field
          :type="{ 'is-danger': this.$v.unit.difficulty.$error }"
          label="Сложность"
        >
          <b-select
            placeholder="Выберите сложность"
            v-model="unit.difficulty"
            @blur="$v.unit.difficulty.$touch()"
          >
            <option
              v-for="(diff, index) in difficulties"
              :value="index + 1"
              :key="index"
              >{{ diff }}</option
            >
          </b-select>
        </b-field>
        <template v-if="$v.unit.difficulty.$error">
          <b-message
            v-if="!$v.unit.difficulty.required"
            type="is-danger"
            size="is-small"
            >Обязательное поле</b-message
          >
        </template>

        <b-field
          :type="{ 'is-danger': this.$v.unit.hint.$error }"
          label="Подсказка"
        >
          <b-input
            type="textarea"
            placeholder="Введите подсказку к заданию"
            v-model="unit.hint"
            @blur="$v.unit.hint.$touch()"
          />
        </b-field>
        <template v-if="$v.unit.hint.$error">
          <b-message
            v-if="!$v.unit.hint.required"
            type="is-danger"
            size="is-small"
            >Обязательное поле</b-message
          >
        </template>
      </section>
      <footer class="modal-card-foot">
        <button type="button" class="button" @click="$parent.close()">
          Закрыть
        </button>
        <button type="submit" class="button is-primary" :disabled="$v.$invalid">
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
  name: 'ModalFormAddUnit',

  data() {
    return {
      unit: this.createFreshQuestionObject(),
      difficulties: this.$store.state.difficulties
    }
  },

  validations: {
    unit: {
      name: { required },
      difficulty: { required },
      hint: { required }
    }
  },

  methods: {
    createFreshQuestionObject() {
      return { name: '', difficulty: null, hint: '' }
    },

    handleSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit('submit', this.unit)
        this.unit = this.createFreshQuestionObject()
        this.$parent.close()
      }
    }
  }
}
</script>
